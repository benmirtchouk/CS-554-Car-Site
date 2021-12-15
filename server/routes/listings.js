const express = require('express');
const router = express.Router();
const VehicleListing = require('../src/DataModel/Automotive/VehicleListing');
const { ValidationError, valida, validateNonBlankString } = require('../src/DataModel/Validation/ObjectProperties');
const { nhtsa } = require("../api");
const { insertListing, listingsWithinMileRadius } = require('../src/MongoOperations/listing');
const { KeyAlreadyExists } = require('../src/MongoOperations/OperationErrors');
const GeoJsonPoint = require('../src/DataModel/GeoJson/GeoJsonPoint');


/**
 * Route to get all listings within a specified radius
 * Params:
 *      Radius: Required, positive float
 *      units: Required, String see `validUnits` in function
 *      longitude: Required, valid longitude as a float
 *      latitude: Required, valid latitude as a float
 * Return codes: 400, 500
 */
router.get('/withinRadius', async (req, res) => {
    const { radius, units, longitude, latitude } = req.query;

    /// Defined as a set for later addition of units beyond miles
    const validUnits = new Set(["miles"]);

    /// Validate parms for 4xx status codes
    if(!validUnits.has(units.toLowerCase())) {
        return res.status(400).json( {message: `${units} is not a supported unit`} );
    }

    if(!isFinite(radius) || radius < 0) {
        return res.status(400).json( {message: `${radius} must be a non-negative number`} );
    }

    let centerPoint;
    try {
        centerPoint = new GeoJsonPoint([longitude, latitude]);
    } catch (e) {
        console.log(e);
        return res.status(400).json( {message: `${longitude} ${latitude} is not a valid longitude & latitude position`} );
    }

    /// Perform the search with no limit on returned results. 
    try {
        const listings = (await listingsWithinMileRadius(centerPoint, radius))
                         .map(e => e.asDictionary())
        return res.json(listings);
    
    } catch (e) {
        console.error(e);
        return res.status(500).json({message: "Internal Server Error"})
    }

})

/**
 * Create a new listing in the database
 * Params:
 *      vin: Required, full vin number. Must not currently have a listing
 *      coordinates: Required, array of form [longitude, latitude] as floats. 
 *      price: Required, positive float
 *      millage: Required, positive float
 *      exteriorColor: Required, any non blank string
 *      interiorColor: Required, any non blank string
 *      photos: Array, currently ignored
 */
router.put('/', async (req, res)=> {

    let vin;

    try {
        vin = validateNonBlankString(req.body.vin)
    } catch (e) {
        return res.status(400).json({message: "Vin must be provided"} );
    }

    const sellerId = req.currentUser?.user_id;
    if (!sellerId) {
        return res.status(401).json({message: "User must be authenticated to send request."} )
    }

    /// Use the vin to pull the meta data to populate the properties
    const { data, status } = await nhtsa.decodeVin(vin);
    if (data == null || status > 400) {
        return res.status(status).send();
    }


    const listingData = {
        vin: vin,
        location: (req.body.coordinates || []).map(parseFloat),
        price: parseFloat(req.body.price),
        millage: parseInt(req.body.millage),
        exteriorColor: req.body.exteriorColor,
        interiorColor: req.body.interiorColor,
        photos: req.body.photos,
        sellerId: sellerId,
        metadata: data,
    };


    let listing;
    try {
        listing = new VehicleListing(listingData);
    } catch(e) {
        if(e instanceof ValidationError) {
            return res.status(400).json({message: e.message} )
        }
        console.error(e);
        return res.status(500).send();
    }


    /// Attempt to insert a listing, return a 422 on a conflict of the same vin to ensure there aren't similar listings
    try {
        await insertListing(listing);
        console.log(`Vin ${vin} listed for sale`)
        return res.json(listing.asDictionary());
    } catch(e) {
        console.log(`Vin of ${vin} is already listed for sale`)
        if (e instanceof KeyAlreadyExists) {
            return res.status(422).json({message:"Vin is already listed for sale"});
        }
        console.error(e);
        return res.status(500).json({message: "Internal server error"});
    }
})


module.exports = router;