const { UserInputError} = require('apollo-server')
const { ApolloError} = require('apollo-server-errors');

const { vinQueryURL} = require('../Networking/DataFetching/vinFetching');

const resolvers = {
    Query: {
        vehicleBy: async (parent, args, { dataSources }) => {
            return await dataSources.nhsta.vinQueryURL(args.vin);
        }

    },
    Mutation: {
        modifyPlaceHolder: async (parent, args) => {
            return {placeholder: "Hello World!"}
        }
    }
};

module.exports = resolvers;