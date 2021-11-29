const { geocode } = require("../config/mongoCollections");
const mongoConnection = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");
// #MARK:- Data construction operations, does *not* do validation, that is handled in data functions

const createGeocodedPoint = (longitude, latitude) => {
    return {
        // longitude: longitude,
        // latitude: latitude,
        coordinates: [longitude, latitude],
        type: "Point"
    }
}



async function seedDB() {

    console.log("Creating connections to collections");
    const geocodeCollection = await geocode();


    console.log("Dropping any previous databases")
    await geocodeCollection.deleteMany({});


    try {
        console.log("Inserting points")
        const points = []
        for(let i = 0; i < 100; i++) {
            for(let j = 0; j < 80; j++) {
                points.push({ location: createGeocodedPoint(i, j)})
            }
        }
        await geocodeCollection.insertMany(points);


        /// TODO: MOVE TO ACTUAL CODE
        await geocodeCollection.createIndex( { location : "2dsphere" } )

    } catch (err) {
        console.error(err);
    } finally {
        console.log("Closing connection");
        const db = await mongoConnection();
        await db.closeConnection();
        console.log("Connection closed!");
    }
}

seedDB();
