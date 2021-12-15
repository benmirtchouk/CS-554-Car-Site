const express = require('express');
const router = express.Router();
const { listingImages } = require('../src/config/mongoFileStream');

router.get("/:name", async (req, res) => {
    /// TODO validate 
    const name = req.params.name;
    const bucket = await listingImages();

    /// TODO set correctly
    res.contentType = ('image/jpg');

    /// TODO error handling
    bucket.openDownloadStreamByName(name).pipe(res);



})

module.exports = router;