const express = require('express');
const { nhtsa } = require('../api');
const router = express.Router();
const { listingForVin, searchListings } = require('../src/MongoOperations/listing');
const  PaginationRequest  = require('../src/PaginationRequest');

router.get('/by/vin/:vin', async (req, res) => {
    const vin = req.params.vin

    const listing = await listingForVin(vin);

    if (listing) {
        return res.json({metadata: listing.metadata, listing: listing.asDictionary()})
    }

    let data;
    let status; 
    try {
        const response  = await nhtsa.decodeVin(vin);
        data = response.data;
        status = response.status;
    }  catch (e) {
        console.log(e);
        return res.status(500).json({ error: `${e}` });
    }

    if(Number.isInteger(status) && status !== 200) {
        return res.status(status).json(data);
    }

    res.json({metadata: data, listing: null });
})

router.get('/by/components', async (req, res) => {

    const validKeys = ["make", "model", "year", "eitherMakeModel"]

    const query = {};
    for (const key of validKeys) {
        const value = req.query[key]
        if(!value) { continue }
        query[key] = value;
    }

    if (Object.keys(query).length === 0) {
        return res.status(400).json({message: `One of ${validKeys} must be present`})
    }

    let paginationRequest;
    try {
        paginationRequest = new PaginationRequest(req.query);
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: e.message});
    }


    const {totalSize, results} = await searchListings(query, paginationRequest);
    res.json({
        pagination: {
            totalSize
        },
        results: results.map(e => e.asDictionary())
    })

})


module.exports = router;