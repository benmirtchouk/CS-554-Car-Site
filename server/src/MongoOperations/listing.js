const { listings} = require('../config/mongoCollections');
const VehicleListing = require('../DataModel/Automotive/VehicleListing')
const { InternalMongoError, KeyAlreadyExists } = require('./OperationErrors');

const insertListing = async (listing) => { 
    if (!(listing instanceof VehicleListing)) { throw new Error("Objecting being inserted must be a vehicle listing!") }

    const collection = await listings();

    const existing = await collection.findOne({ vin: listing.vin })
    if (existing) {
        throw new KeyAlreadyExists("vin", "Vin number already listed for sale!")
    }

    const id = await collection.insertOne(listing.asDictionary(false))
    if (id == null) {
        throw new InternalMongoError("Insertion failed");
    }
    return listing;
}


module.exports = {
    insertListing,
}