const express = require('express');
const router = express.Router();
const VehicleListing = require('../src/DataModel/Automotive/VehicleListing');
const { ValidationError, valida, validateNonBlankString } = require('../src/DataModel/Validation/ObjectProperties');
const { nhtsa } = require("../api");
const { insertListing, listingsWithinMileRadius } = require('../src/MongoOperations/listing');
const { KeyAlreadyExists } = require('../src/MongoOperations/OperationErrors');
const GeoJsonPoint = require('../src/DataModel/GeoJson/GeoJsonPoint');


router.get('/withinRadius', async (req, res, next) => {
    const { radius, units, longitude, latitude } = req.query;

    const validUnits = new Set(["miles"]);
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

    try {
        const listings = (await listingsWithinMileRadius(centerPoint, radius))
                         .map(e => e.asDictionary())
        return res.json(listings);
    
    } catch (e) {
        console.error(e);
        return res.status(500).json({message: "Internal Server Error"})
    }

})

router.put('/', async (req, res)=> {

    let vin;

    try {
        vin = validateNonBlankString(req.body.vin)
    } catch (e) {
        return res.status(400).json({message: "Vin must be provided"} );
    }

    const sellerId = req.currentUser
    if (sellerId == null) {
        return res.status(401),json({message: "User must be authenticated to send request."} )
    }


    const { data, status } = await nhtsa.decodeVin(vin);
    if (data == null || status > 400) {
        return res.status(status).send();
    }
    req.body.metadata = data;
    let listing;
    try {
        listing = new VehicleListing(req.body);
    } catch(e) {
        if(e instanceof ValidationError) {
            return res.status(400).json({message: e.message} )
        }
        console.error(e);
        return res.status(500).send();
    }


    try {
        await insertListing(listing);
        return res.json(listing.asDictionary());
    } catch(e) {
        if (e instanceof KeyAlreadyExists) {
            return res.status(422).json({message:"Vin is already listed for sale"});
        }
        console.error(e);
        return res.status(500).json({message: "Internal server error"});
    }
})


module.exports = router;