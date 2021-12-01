const { UserInputError, ApolloError } = require("apollo-server-errors");
const GeoJsonPoint = require("../DataModel/GeoJson/GeoJsonPoint");
const { InvalidCoordinateType } = require("../DataModel/GeoJson/GeoJsonType");


const resolvers = {
    Query: {
        vehicleBy: async (parent, args, { dataSources })  => {
            return await dataSources.nhsta.vinQueryURL(args.vin);
        },

        getPointsBy: async(parent, args, { dataSources }) => {

            const point = convertPointFromGraphQLToDataModel(args.point);
            const returnedPoints = await dataSources.geocoded.locationsWithinMileRadius(point, args.radius)

            return returnedPoints
                    .map(e => e.coordinateJson)
        }

    },
    Mutation: {
        modifyPlaceHolder: async (parent, args) => {
            return {placeholder: "Hello World!"}
        },
        addPoint: async (parent, args, { dataSources } ) => {
            
            const point = convertPointFromGraphQLToDataModel(args.point)
            await dataSources.geocoded.insertPoint(point);

            return point.coordinateJson;
        }
    }
};



const convertPointFromGraphQLToDataModel = (point) => {
    try {
        return  new GeoJsonPoint(point);
    } catch(e) {
        if (e instanceof InvalidCoordinateType) {
            throw new UserInputError(e.message);
        } else {
            console.error(e);
            throw new ApolloError("Failed to parse provided point")
        }
    }
}

module.exports = resolvers;