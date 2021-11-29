/// TODO MOVE
const { geocode } = require("../config/mongoCollections");


const resolvers = {
    Query: {
        vehicleBy: async (parent, args, { dataSources }) => {
            return await dataSources.nhsta.vinQueryURL(args.vin);
        },

        getPointsBy: async(parent, args) => {

            const milesToRadian = function(miles){
                const earthRadiusInMiles = 3963;
                return miles / earthRadiusInMiles;
            };
            


            const point = args.point;
            const pointArray = [point.longitude, point.latitude];
            const radius = milesToRadian(args.radius);
            console.log(pointArray)
            console.log(radius);
            const geocodeCollection = await geocode();
            const returnedPoints = (await geocodeCollection.find({
                location: { 
                    $geoWithin: { 
                        $centerSphere: [ pointArray, radius ] 
                    } 
                }

            })
            .toArray())
            .map(e => e.location.coordinates)
            .map(e => { return { longitude: e[0], latitude:e[1] }})

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