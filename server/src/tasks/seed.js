const { geocode, listings } = require("../config/mongoCollections");
const mongoConnection = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");
const listingData = require('./listingSeed.json');
const listingMongoOperation = require('../MongoOperations/listing');
const VehicleListing = require('../DataModel/Automotive/VehicleListing');

// #MARK:- Data construction operations, does *not* do validation, that is handled in data functions (or programmer validation when bypassed)

const createGeocodedPoint = (longitude, latitude) => {
    return {
        coordinates: [longitude, latitude],
        type: "Point"
    }
}




async function seedDB() {


    console.log("Creating connections to collections");
    const listingCollection = await listings();

    console.log("Dropping any previous databases")
    await listingCollection.deleteMany({});

    try {
        console.log("Inserting Listings")
        for(const listingRawData of listingData) {
            const listing = new VehicleListing(listingRawData);
            await listingMongoOperation.insertListing(listing);
        }

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
