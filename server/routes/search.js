const express = require('express');
const { nhtsa } = require('../api');
const router = express.Router();
const { listingForVin } = require('../src/MongoOperations/listing');


router.get('/byvin/:vin', async (req, res) => {
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



module.exports = router;