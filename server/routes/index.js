const axios = require('axios');
const bluebird = require('bluebird');
const e = require('express');
const redis = require('redis');
const client = redis.createClient();

const { decodeIDToken } = require("../firebase/firebase")
const carsRoutes = require("./cars")

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

async function cacheJSON(req, res, next) {
  const url = req.originalUrl || req.url;
  const cached = await client.hgetAsync('__express__', url);

  if (cached !== null) {
    res.json(JSON.parse(cached));
  } else {
    res._json = res.json;
    res.json = (body) => {
      client.hsetAsync('__express__', url, JSON.stringify(body));
      res._json(body);
    };
    next();
  }
}

const constructorMethod = (app) => {
  // middleware
  app.use(decodeIDToken);

  // routes
  app.use('/cars', cacheJSON, carsRoutes);

  // default (404)
  app.use('*', (req, res) => {
    res.status(404).send();
  });
};

module.exports = constructorMethod;