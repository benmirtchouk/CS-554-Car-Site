const { listings, accounts , listingImageFiles, listingImageChunks} = require("../config/mongoCollections");
const mongoConnection = require("../config/mongoConnection");
const listingData = require('./listingSeed.json');
const accountData = require('./accountSeed.json');
const listingMongoOperation = require('../MongoOperations/listing');
const accountMongoOperation = require('../MongoOperations/account');
const VehicleListing = require('../DataModel/Automotive/VehicleListing');
const Account = require('../DataModel/Account/Account');


async function seedDB() {

    console.log("Creating connections to collections");
    const listingCollection = await listings();
    const accountCollection = await accounts();
    const listingImageFilesCollection = await listingImageFiles();
    const listingImageChunksCollection = await listingImageChunks();

    console.log("Dropping any previous databases")
    await listingCollection.deleteMany({});
    await accountCollection.deleteMany({});
    await listingImageFilesCollection.deleteMany({});
    await listingImageChunksCollection.deleteMany({});

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
