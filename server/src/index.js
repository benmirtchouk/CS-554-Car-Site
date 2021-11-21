require('dotenv').config()
const {ApolloServer} = require('apollo-server')
const { typeDefs, resolvers, dataSources, redisCaching} = require('./GraphQL')
const responseCachePlugin = require('apollo-server-plugin-response-cache')


const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources,
    cache: redisCaching
});


//(new Redis()).set("foo", "bar");
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});