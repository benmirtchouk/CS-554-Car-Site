const { listings, accounts , listingImageFiles, listingImageChunks} = require("../config/mongoCollections");
const mongoConnection = require("../config/mongoConnection");
const listingData1 = require('./seed_files/listingSeed1.json');
const listingData2 = require('./seed_files/listingSeed2.json');
const listingData3 = require('./seed_files/listingSeed3.json');
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
        console.log("Inserting Listings from SeedFile1....")
	let i=0;
        for(const listingRawData of listingData1) {
            const listing = new VehicleListing(listingRawData);
	    if (!(i%10))
		listing["sold"]=true;
            await listingMongoOperation.insertListing(listing);
            i=i+1;
        }
        console.log("Inserting Listings from SeedFile2....")
	i=0;
        for(const listingRawData of listingData2) {
            const listing = new VehicleListing(listingRawData);
	    if (!(i%10))
		listing["sold"]=true;
            await listingMongoOperation.insertListing(listing);
            i=i+1;
        }
        console.log("Inserting Listings from SeedFile3....")
	i=0;
        for(const listingRawData of listingData3) {
            const listing = new VehicleListing(listingRawData);
	    if (!(i%10))
		listing["sold"]=true;
            await listingMongoOperation.insertListing(listing);
            i=i+1;
        }

    } catch (err) {
        console.error(err);
    } 

    try {
        console.log("Inserting listing images")
        const imageDirectory = "./src/tasks/listingSeedImages"
        const seedImageFiles = fs.readdirSync(imageDirectory)
        for(const fileName of seedImageFiles) {
	    if (fileName.includes("car_picture")) continue;
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
