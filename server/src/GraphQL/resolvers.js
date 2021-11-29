/// TODO MOVE
const { UserInputError, ApolloError } = require("apollo-server-errors");
const { geocode } = require("../config/mongoCollections");
const GeoJsonPoint = require("../DataModel/GeoJson/GeoJsonPoint");
const { InvalidCoordinateType } = require("../DataModel/GeoJson/GeoJsonType");


const resolvers = {
    Query: {
        vehicleBy: async (parent, args, { dataSources })  => {
            return await dataSources.nhsta.vinQueryURL(args.vin);
        },

        getPointsBy: async(parent, args, { dataSources }) => {

            let point;
            try {
                point = new GeoJsonPoint(args.point);
            } catch(e) {
                if (e instanceof InvalidCoordinateType) {
                    throw new UserInputError(e.message);
                } else {
                    console.error(e);
                    throw new ApolloError("Failed to parse provided point")
                }
            }

            const returnedPoints = await dataSources.geocoded.locationsWithinMileRadius(point, args.radius)

            return returnedPoints
                    .map(e => e.coordinateJson)
        }

    },
    Mutation: {
        modifyPlaceHolder: async (parent, args) => {
            return {placeholder: "Hello World!"}
        },
        addPoint: async (parent, args) => {
            
            const point = args.point;
            const geocodeCollection = await geocode();
            /// TODO Upsert?
            await geocodeCollection.insertOne(point);

            return point;
        }
    }
};

module.exports = resolvers;