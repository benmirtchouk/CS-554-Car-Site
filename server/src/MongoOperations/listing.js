const { listings} = require('../config/mongoCollections');
const VehicleListing = require('../DataModel/Automotive/VehicleListing')
const { InternalMongoError, KeyAlreadyExists } = require('./OperationErrors');
const { ValidationError } = require('../DataModel/Validation/ObjectProperties');
const GeoJsonPoint = require('../DataModel/GeoJson/GeoJsonPoint');
const { uploadImage } = require('./imageUploads');
const PaginationRequest = require('../PaginationRequest');

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

/// Get the size of collection from its metadata. 
/// Note: While this function may be skewed, without sharding or a forced shutdown it should be accurate per the docs
const countFromMetadata = async () => {
    const collection = await listings();
    return await collection.count();
}

async function getAllListings(paginationRequest) {
    if(!paginationRequest instanceof PaginationRequest) {
        throw new Error("Pagination request not provided")
    }
    const {offset, limit} = paginationRequest;

    const collection = await listings();
    const listingData = await collection.find({})
    .skip(offset)
    .limit(limit)
    .toArray()
    return listingData.map(e => new VehicleListing(e));
}

async function getUserListings(userid, paginationRequest) {
    if (typeof userid !== 'string') throw 'userid must be a string';
    if(!paginationRequest instanceof PaginationRequest) {
        throw new Error("Pagination request not provided")
    }
    const {offset, limit } = paginationRequest
    
    const collection = await listings();
    const listingCursor = await collection.find({ sellerId: userid })
    const totalListings = await listingCursor.count();
    const listingData = await listingCursor.
                        skip(offset)
                        .limit(limit)
                        .toArray()
    return {
        totalSize: totalListings,
        results: listingData.map(e => new VehicleListing(e))
    };
}

const searchListings = async (query, paginationRequest) => {
    if(!paginationRequest instanceof PaginationRequest) {
        throw new Error("Pagination request not provided")
    }

    const {offset, limit } = paginationRequest;
    const collection = await listings();

   const formattedQuery = parseMakeModelForQuery(query);
    if (isFinite(query.year - 0)) {
        formattedQuery.push({['metadata.modelYear']: query.year - 0})
    }

    if (formattedQuery.length === 0) {
        console.error("No keys!")
        return
    }


    const searchCursor = await collection
    .find({$and: formattedQuery})

    const count = await searchCursor.count()

    const listingData = (await searchCursor
                        .skip(offset)
                        .limit(limit)
                        .toArray())
                        .map (e => new VehicleListing(e))


    return {
        totalSize: count,
        results: listingData
    } 
            
}



const uploadPhotoForVin = async (vin, photo) => {
    if (typeof photo !== 'string' || typeof vin !== 'string') { 
        throw new Error(`Vin or photo is not a string.${vin} ${typeof photo}`)
     }

    const listing = await listingForVin(vin);
    if (!listing) { throw new Error("Listing not found!") }

    
    const collection = await listings();
    try {
        const {_id, filename } = await uploadImage(photo, vin);
        if(_id == null || filename == null) {
            throw new Error(`One required field null! ${_id} ${filename}`);
        }

        await collection.updateOne(
            { vin: vin },
            { $set: {"photo": {_id, filename}}}
        )

        return {_id, filename};
    } catch (e) {
        console.error(`Failed to upload image: ${e}`);
        throw e;
    }
}

const insertListing = async (listing) => { 
    if (!(listing instanceof VehicleListing)) { throw new Error("Objecting being inserted must be a vehicle listing!") }


    const existing = await listingForVin(listing.vin);

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
    countFromMetadata,
    getAllListings,
    getUserListings,
    searchListings,
    insertListing,
    listingsWithinMileRadius,
    listingsWithinRadianRadius,
    uploadPhotoForVin,
}