const { UserInputError} = require('apollo-server')
const { ApolloError} = require('apollo-server-errors');

const vinFetching = require('../Networking/DataFetching/vinFetching');

const resolvers = {
    Query: {
        vehicleBy: async (parent, args) => {
            const data = await vinFetching.vinQueryURL(args.vin);
            if(!data) { 
                return null
            }
            return data
        }

    },
    Mutation: {
        modifyPlaceHolder: async (parent, args) => {
            return {placeholder: "Hello World!"}
        }
    }
};

module.exports = resolvers;