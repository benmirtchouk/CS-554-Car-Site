const { listings} = require('../config/mongoCollections');
const VehicleListing = require('../DataModel/Automotive/VehicleListing')
const { InternalMongoError, KeyAlreadyExists } = require('./OperationErrors');
const { ValidationError } = require('../DataModel/Validation/ObjectProperties');
const GeoJsonPoint = require('../DataModel/GeoJson/GeoJsonPoint');
const { listingImages }= require("../config/mongoFileStream");
const { Duplex } = require('stream');

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

    const listingData = await collection.find({$and: formattedQuery}).toArray()

    return listingData 
            .map (e => new VehicleListing(e))
}


const validImageTypes = new Set(["jpg", "jpeg", "png"]);
// https://en.wikipedia.org/wiki/List_of_file_signatures
const fileTypeMagicHexPrefix = {
    "jpg": "FFD8FF",
    "jpeg": "FFD8FF",
    "png": "89504E47"
}

class UnsupportedFileType extends Error {
    constructor(type, message) {
        super(message);
        this.type = type;
    }
}

class InvalidFile extends Error {
    constructor(targetPrefix, actualPrefix, message) {
        super(message)
        this.targetPrefix = targetPrefix;
        this.actualPrefix = actualPrefix;
    }
}

/// Private
const uploadImage = async (photo, vin ) => {
    const [header, imageData] = photo.split(",")
    const [type, encoding] = header.split(";");
    const fileExtension = type.split("/")[1];
    if(!fileExtension || !validImageTypes.has(fileExtension) ) { throw new UnsupportedFileType(fileExtension || "Missing extension", "Extension is not supported")}
   
    const magicPrefix = fileTypeMagicHexPrefix[fileExtension];
    const base64magicPrefix = Buffer.from(magicPrefix, 'hex').toString('base64').replace(/=/g, "");
    const correctPrefix = imageData.startsWith(base64magicPrefix);
    if(!correctPrefix) {
        throw new InvalidFile(base64magicPrefix, imageData.substring(0, base64magicPrefix.length), "File had incorrect magic number prefix")
    }
   
    ///TODO validate (Encoding, data, nullablity,)
    /// TODO GENERATE NAME
    const buffer = Buffer.from(imageData, encoding);
    const imageStream = new Duplex();
    imageStream.push(buffer);
    imageStream.push(null);

    const fileName = `${vin}-${new Date().toISOString()}.${fileExtension}`
    const bucket = await listingImages()

    return new Promise((resolve, reject) => {
        imageStream.
        pipe(bucket.openUploadStream(fileName)).
        on('error', function(error) {
          console.log(`Error! ${error}`)
          reject(error);
        }).
        on('finish', function(e) {
          console.log(`done! ${JSON.stringify(e)}`);
          resolve(e);
        });
    })

}


const uploadPhotoForVin = async (vin, photo) => {
    if (typeof photo !== 'string' || typeof vin !== 'string') { return false; }

    const listing = await listingForVin(vin);
    if (!listing) { return false; }

    
    const collection = await listings();
    try {
        const {_id, filename } = await uploadImage(photo, vin);
        if(_id == null || filename == null) {
            throw new Error(`One required field null! ${_id} ${filename}`);
        }
        collection.updateOne(
            { vin: vin },
            { $set: {"photo": {_id, filename}}}
        )
        return null;
    } catch (e) {
        console.error(`Failed to upload image: ${e}`);
        return null;
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
    searchListings,
    insertListing,
    listingsWithinMileRadius,
    listingsWithinRadianRadius,
    uploadPhotoForVin,

}