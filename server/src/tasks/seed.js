const { listings, accounts , listingImageFiles, listingImageChunks} = require("../config/mongoCollections");
const mongoConnection = require("../config/mongoConnection");
const listingData = require('./listingSeed.json');
const accountData = require('./accountSeed.json');
const listingMongoOperation = require('../MongoOperations/listing');
const accountMongoOperation = require('../MongoOperations/account');
const VehicleListing = require('../DataModel/Automotive/VehicleListing');
const Account = require('../DataModel/Account/Account');
const fs = require('fs');


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
        console.log("Inserting listing images")
        const imageDirectory = "./src/tasks/listingSeedImages"
        const seedImageFiles = fs.readdirSync(imageDirectory)
        for(const fileName of seedImageFiles) {
            const [vin, fileType] = fileName.split(".");
            const header = `data:image/${fileType};base64,`
            try {
                const base64FileData = fs.readFileSync(`${imageDirectory}/${fileName}`, 'base64');
                const photoContents = `${header}${base64FileData}`
                await listingMongoOperation.uploadPhotoForVin(vin, photoContents);
            } catch(e) {
                console.error(`Failed to seed image for ${vin}. -- ${e}`);
            }

        }
    } catch(e) {
        console.error(`Failed to seed images. (Seed task should be ran from server root directory) -- ${e}`);
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
