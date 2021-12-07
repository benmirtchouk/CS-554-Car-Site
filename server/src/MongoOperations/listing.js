const { listings} = require('../config/mongoCollections');
const VehicleListing = require('../DataModel/Automotive/VehicleListing')
const { InternalMongoError, KeyAlreadyExists } = require('./OperationErrors');
const { ValidationError } = require('../DataModel/Validation/ObjectProperties');
const GeoJsonPoint = require('../DataModel/GeoJson/GeoJsonPoint');
const e = require('express');

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


const milesToRadian = (miles) => {
    if(!isFinite(miles) || miles < 0) { throw new ValidationError("Provided miles must be a non-negative number")}
    /// https://docs.mongodb.com/manual/tutorial/calculate-distances-using-spherical-geometry-with-2d-geospatial-indexes/
    const earthRadiusInMiles = 3963.2;
    return miles / earthRadiusInMiles;
};



/// Convenience wrapper for a location query which converts miles to Radians 
const listingsWithinMileRadius = async (centerPoint, radius) => {
    return await listingsWithinRadianRadius(centerPoint, milesToRadian(radius))
}

/// Find all data points within the provided radius, in radians, from the center point
const listingsWithinRadianRadius = async (centerPoint, radius) => {
    if (!isFinite(radius) || radius < 0) { throw new ValidationError("Radians must be non negative!"); }
    if (! (centerPoint instanceof GeoJsonPoint) ) { throw new Error("Center point must be a GeoJson point!")}
    const collection = await listings();
    const results = (await collection.find({
        location: { 
            $geoWithin: { 
                $centerSphere: [ centerPoint.coordinateArray, radius ] 
            } 
        }
    })
    .toArray())

    return results
            .map(e => { return {...e, location: e.location.coordinates}})
            .map(e => new VehicleListing(e))
}


module.exports = {
    insertListing,
    listingsWithinMileRadius,
    listingsWithinRadianRadius,

}