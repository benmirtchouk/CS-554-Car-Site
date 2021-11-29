require('dotenv').config()
const {ApolloServer} = require('apollo-server')
const { typeDefs, resolvers, dataSources, redisCaching} = require('./GraphQL')





const startServer = async () => {

  /// Apollo Server does not correctly handle async sources due to constant re-requesting of the property.
  /// As all uses of the async are for lazy network connections, run them once at start-up, and return those
  /// resolved references in a wrapper. 
  console.log("Resolving async data sources...")
  const sources = await dataSources()
  const dataSourcesWrapper = () => { return sources; }
  console.log("Async data sources resolved, continuing start-up of server");


  const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: dataSourcesWrapper,
    cache: redisCaching
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url} 🚀`);
  });
}


startServer()