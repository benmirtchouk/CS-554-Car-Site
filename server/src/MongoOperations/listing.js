const { listings} = require('../config/mongoCollections');
const VehicleListing = require('../DataModel/Automotive/VehicleListing')
const { InternalMongoError, KeyAlreadyExists } = require('./OperationErrors');
const { ValidationError } = require('../DataModel/Validation/ObjectProperties');
const GeoJsonPoint = require('../DataModel/GeoJson/GeoJsonPoint');
const { uploadImage } = require('./imageUploads');
const PaginationRequest = require('../PaginationRequest');
const { ObjectId } = require('mongodb');

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

async function getListing(id) {
    if(!id instanceof ObjectId) {
        throw new Error("Invalid id provided")
    }
    const collection = await listings();
    const listing = await collection.findOne({_id: id})
    return listing === null ? null : new VehicleListing(listing);
}

async function buyListing(userid, id) {
    if (typeof userid !== 'string') throw 'userid must be a string';
    if(!id instanceof ObjectId) {
        throw new Error("Invalid id provided")
    }
    const collection = await listings();
    const listing = await collection.findOne({_id: id})

    if (listing === null || listing.sold) return false;
    
    await collection.updateOne(
        { _id: id },
        { $set: {sold: true, dateSold: new Date(Date.now())}}
    );

    return true;
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

const getRecentlyByDateKey = async (paginationRequest, dateKey) => {
    if(!paginationRequest instanceof PaginationRequest) {
        throw new Error("Pagination request not provided")
    }
    const {offset, limit} = paginationRequest;

    const validKeys = new Set(["soldOn", "createdOn"]);
    if(!validKeys.has(dateKey)) {
        throw new Error("Key does not exist in schema");
    }

    const collection = await listings();
    const listingData = await collection
                        .find({[dateKey]: {$ne: null}})
                        .sort({[dateKey]: -1})
                        .skip(offset)
                        .limit(limit)
                        .toArray();
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

const getAllSellers = async (paginationRequest) => {
    if(!paginationRequest instanceof PaginationRequest) {
        throw new Error("Pagination request not provided")
    }

    const {offset, limit } = paginationRequest;
    const collection = await listings();

    const pipeline = [
        {$group : {_id: "$sellerId", count: { $sum: 1 } }},
        {$sort: { count: -1}},
        {$skip: offset},
        {$limit: limit},
    ];
    const aggCursor = collection.aggregate(pipeline);
    const data = {}
    for await (const doc of aggCursor) {
        data[doc._id] = doc.count
    }

    return data;
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

    //typically listing shouldn't have a creation date at
    // first - but there will be one when seeding the data
    // so skip if there is a date already.
    if (listing.createdOn===undefined || listing.createdOn===null)
        listing.createdOn=new Date();

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
const listingsWithinMileRadius = async (centerPoint, radius, paginationRequest) => {
    return await listingsWithinRadianRadius(centerPoint, milesToRadian(radius), paginationRequest)
}

/// Find all data points within the provided radius, in radians, from the center point
const listingsWithinRadianRadius = async (centerPoint, radius, paginationRequest) => {
    if (!isFinite(radius) || radius < 0) { throw new ValidationError("Radians must be non negative!"); }
    if (! (centerPoint instanceof GeoJsonPoint) ) { throw new Error("Center point must be a GeoJson point!")}
    if (! (paginationRequest instanceof PaginationRequest)) { throw new Error("Pagination request must be supplied!"); }
    const {offset, limit} = paginationRequest;
    
    const collection = await listings();
    const resultCursor = await collection.find({
        location: { 
            $geoWithin: { 
                $centerSphere: [ centerPoint.coordinateArray, radius ] 
            } 
        }
    })

    const totalCount = await resultCursor.count();
    const results = await resultCursor
                    .skip(offset)
                    .limit(limit)
                    .toArray();
    const listingResult = results
                    .map(e => new VehicleListing(e))

    
    return {
        totalCount: totalCount,
        results: listingResult
    } 
}


module.exports = {
    listingForVin,
    countFromMetadata,
    getListing,
    getAllListings,
    getUserListings,
    getRecentlyByDateKey,
    searchListings,
    insertListing,
    listingsWithinMileRadius,
    listingsWithinRadianRadius,
    getAllSellers,
    uploadPhotoForVin,
    buyListing,
}