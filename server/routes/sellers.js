const express = require('express');
const router = express.Router();

const sellerMongoOperation = require('../src/MongoOperations/sellers');


router.get("/", async (req, res) => {

    try {
        const sellersList = await sellerMongoOperation.getAllSellers();
        console.log("from routes", sellersList);
        res.json(sellersList);

    } catch (e) {
        res.status(500).json({ error: e });
    }

});

module.exports = router;
