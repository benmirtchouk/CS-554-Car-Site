/// TODO MOVE
const { geocode } = require("../config/mongoCollections");


const resolvers = {
    Query: {
        vehicleBy: async (parent, args, { dataSources })  => {
            return await dataSources.nhsta.vinQueryURL(args.vin);
        },

        getPointsBy: async(parent, args, { dataSources }) => {

            const point = args.point;
            const pointArray = [point.longitude, point.latitude];

            const returnedPoints = await dataSources.geocoded.locationsWithinMileRadius(pointArray, args.radius)
            console.log(JSON.stringify(returnedPoints));

            return returnedPoints;
        }

    },
    Mutation: {
        modifyPlaceHolder: async (parent, args) => {
            return {placeholder: "Hello World!"}
        },
        addPoint: async (parent, args) => {
            
            const point = args.point;
            console.log(point.longitude)
            console.log(point.latitude)
            const geocodeCollection = await geocode();
            /// TODO Upsert?
            await geocodeCollection.insertOne(point);

            return point;
        }
    }
};

module.exports = resolvers;