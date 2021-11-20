require('dotenv').config()
const {ApolloServer} = require('apollo-server')
const typeDefs = require('./GraphQL/typeDefs');
const resolvers = require('./GraphQL/resolvers');


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});