const { geocode, listings, accounts } = require("../config/mongoCollections");
const mongoConnection = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");
const listingData = require('./listingSeed.json');
const accountData = require('./accountSeed.json');
const listingMongoOperation = require('../MongoOperations/listing');
const accountMongoOperation = require('../MongoOperations/account');
const VehicleListing = require('../DataModel/Automotive/VehicleListing');
const Account = require('../DataModel/Account/Account');

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
    const accountCollection = await accounts();

    console.log("Dropping any previous databases")
    await listingCollection.deleteMany({});
    await accountCollection.deleteMany({});

    try {
        console.log("Inserting Listings")
        for(const listingRawData of listingData) {
            const listing = new VehicleListing(listingRawData);
            await listingMongoOperation.insertListing(listing);
        }

    } catch (err) {
        console.error(err);
    } 
     

    try {
        console.log("Inserting Account Information")
        for(const accountRawData of accountData) {
            const account = new Account(accountRawData);
            await accountMongoOperation.createAccount(account);
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
