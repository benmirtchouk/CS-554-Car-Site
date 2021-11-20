const { UserInputError} = require('apollo-server')
const { ApolloError} = require('apollo-server-errors');

const resolvers = {
    Query: {
        getPlaceholders: async (parent, args) => {
            return [{placeholder: "Hello World!"}]
        }

    },
    Mutation: {
        modifyPlaceHolder: async (parent, args) => {
            return {placeholder: "Hello World!"}
        }
    }
};

module.exports = resolvers;