const { geocode } = require("../config/mongoCollections");
const mongoConnection = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");

// #MARK:- Data construction operations, does *not* do validation, that is handled in data functions (or programmer validation when bypassed)

const createGeocodedPoint = (longitude, latitude) => {
    return {
        coordinates: [longitude, latitude],
        type: "Point"
    }
}




async function seedDB() {

    console.log("Creating connections to collections");
    const geocodeCollection = await geocode();


    console.log("Dropping any previous databases")
    await geocodeCollection.deleteMany({});


    /// Arbitrarily drawn bounding box which contains all of NJ, and parts of NY, PA, DE, MD
    const westLong = -76.223145
    const eastLong = -73.828125
    const southLat = 38.908133
    const northLat = 43.317185


    try {
        console.log("Inserting points")
        const points = []

        /// Step of `0.01` generates ~10 per one mile radius in the center of the box. Steps of `0.003` or smaller can cause performance issues due to the order of growth of points
        const step = 0.01
        for(let longitude = westLong; longitude < eastLong; longitude += step) {
            for(let latitude = southLat; latitude < northLat; latitude += step) {
                points.push({ location: createGeocodedPoint(longitude, latitude)})
            }
        }
        console.log(`Generated ${points.length} points`)


        /// Bypass setting logic due to large size of insert
        await geocodeCollection.insertMany(points);   

    } catch (err) {
        console.error(err);
    } finally {
        console.log("Closing connection");
        const db = await mongoConnection();
        await db.closeConnection();
        console.log("Connection closed!");
        process.exit(0);
    }
}

seedDB();
