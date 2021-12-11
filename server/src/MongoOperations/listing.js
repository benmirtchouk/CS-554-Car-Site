const { listings} = require('../config/mongoCollections');
const VehicleListing = require('../DataModel/Automotive/VehicleListing')
const { InternalMongoError, KeyAlreadyExists } = require('./OperationErrors');
const { ValidationError } = require('../DataModel/Validation/ObjectProperties');
const GeoJsonPoint = require('../DataModel/GeoJson/GeoJsonPoint');

const listingForVin = async (vin) => {
    if(typeof vin !== 'string') { throw new Error("Vin is not a string!"); }
    const collection = await listings();
    const listingData = await collection.findOne({ vin: vin });
    if(!listingData) { return null; }
    return new VehicleListing(listingData);
}


const parseMakeModelForQuery = (query, operator="$and") => {
    if(query.eitherMakeModel) {
        return parseMakeModelForQuery({ make: query.eitherMakeModel,
                                    model: query.eitherMakeModel}, "$or")
    }

    const regexQueryKeys = ["make", "model"]
    const queryArray = []
    for (const key of regexQueryKeys) {
        const value = query[key];
        if(!value || value === "") { continue; }
        queryArray.push({[`metadata.${key}`]: {$regex: value, $options: "$i"}})
    }

    return !!queryArray.length ? [{[operator]: queryArray}] : [];

}


const searchListings = async (query) => {
    const collection = await listings();

   const formattedQuery = parseMakeModelForQuery(query);

    if (isFinite(query.year - 0)) {
        formattedQuery.push({['metadata.modelYear']: query.year - 0})
    }

    if (formattedQuery.length === 0) {
        console.error("No keys!")
        return
    }


    console.log(formattedQuery)
    const listingData = await collection.find({$and: formattedQuery}).toArray()

    return listingData 
            .map (e => new VehicleListing(e))
}

const insertListing = async (listing) => { 
    if (!(listing instanceof VehicleListing)) { throw new Error("Objecting being inserted must be a vehicle listing!") }


    const existing = await listingForVin(vin);

    if (existing) {
        throw new KeyAlreadyExists("vin", "Vin number already listed for sale!")
    }
    const collection = await listings();

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
    listingForVin,
    searchListings,
    insertListing,
    listingsWithinMileRadius,
    listingsWithinRadianRadius,

}