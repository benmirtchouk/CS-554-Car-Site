const { NHSTADataSource } = require('./DataSources')

const dataSources = () => ({
    nhsta: new NHSTADataSource.NHSTADataSource(),
  })


module.exports = dataSources;