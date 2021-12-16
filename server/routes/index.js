const axios = require('axios');
const bluebird = require('bluebird');
const e = require('express');
const redis = require('redis');
const client = redis.createClient();

const { decodeIDToken } = require("../firebase/firebase")
const carsRoutes = require("./cars")
const listingRoutes = require('./listings');
const searchRoutes = require('./search');
const imageRoutes = require('./images');
const accountRoutes = require('./accounts');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

async function cacheJSON(req, res, next) {
  const url = req.originalUrl || req.url;
  const cached = await client.hgetAsync('__express__', url);

  if (cached !== null) {
    const { status, json } = JSON.parse(cached);
    res.status(status).json(json);
  } else {
    const _json = res.json;
    res.json = (json) => {
      const status = res.statusCode;
      if (status == 200) {
        client.hsetAsync('__express__', url, JSON.stringify({ status, json }));
      }

      res.json = _json;
      res.json(json);
    };
    next();
  }
}

const constructorMethod = (app) => {
  // middleware
  app.use(decodeIDToken);

  // routes
  app.use('/cars', cacheJSON, carsRoutes);
  app.use('/listing', listingRoutes);
  app.use('/search', searchRoutes);
  app.use('/images', imageRoutes);
  app.use('/account', accountRoutes);
  
  // default (404)
  app.use('*', (req, res) => {
    res.status(404).send();
  });
};

module.exports = constructorMethod;
