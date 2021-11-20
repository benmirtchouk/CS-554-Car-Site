const { NHSTADataSource } = require('../Networking/DataFetching/vinFetching')

const dataSources = () => ({
    nhsta: new NHSTADataSource(),
  })


module.exports = dataSources;