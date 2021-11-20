require('dotenv').config()
const {ApolloServer} = require('apollo-server')
// const typeDefs = require('./GraphQL/typeDefs');
// const resolvers = require('./GraphQL/resolvers');
// const dataSources = require('./GraphQL/dataSources')
const { typeDefs, resolvers, dataSources} = require('./GraphQL')


const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});