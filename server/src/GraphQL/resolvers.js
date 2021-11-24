
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