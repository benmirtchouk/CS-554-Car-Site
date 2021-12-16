const express = require('express');
const router = express.Router();
const { listingImages } = require('../src/config/mongoFileStream');

router.get("/:name", async (req, res) => {
    const name = req.params.name;
    if(name.length === 0) { 
        return res.json("400").message({ message: "Name cannot be blank"})
    }
    const bucket = await listingImages();

    return bucket.openDownloadStreamByName(name)
    .on("error", (e) => {
        if(e.code !== 'ENOENT') {
            console.error(e);
        }
        return res.status(404).json({message: "Not found"});
    })
    .pipe(res);


})

module.exports = router;