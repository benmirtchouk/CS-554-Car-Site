const { NHSTADataSource, GeocodedLocationDataSource } = require('./DataSources')
const { geocode } = require('../config/mongoCollections');

const dataSources = async () => ({
    nhsta: new NHSTADataSource.NHSTADataSource(),
    geocoded: new GeocodedLocationDataSource(await geocode())
  })


module.exports = dataSources;