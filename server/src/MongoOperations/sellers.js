const { sellers } = require("../config/mongoCollections");
let { ObjectId } = require('mongodb');


async function getSeller(id) {

    if (!id) {
        throw 'Id parameter must be supplied';
    }

    if (typeof id !== 'string' || id.trim().length === 0) {
        throw "Id must be a non-empty string";
    }

    let parsedId;
    try {
        parsedId = ObjectId(id);
    } catch (error) {
        throw `Received invalid id: ${id}`;
    }

    const sellersCollection = await sellers();
    const seller = await sellersCollection.findOne({ _id: parsedId });

    if (seller === null) {
        throw `No seller with id: ${id}`;
    }

    seller._id = seller._id.toString();

    return seller;

}

async function insertNewSeller(seller) {

    if (!seller || typeof seller !== 'object' || Array.isArray(seller)) {
        throw `Invalid seller received.`;
    }

    if (!seller.sellerId || !seller.name) {
        throw `Incomplete seller infomration`;
    }

    const sellersCollection = await sellers();

    const insertedSeller = await sellersCollection.insertOne(seller);

    if (insertedSeller.insertedCount === 0) {
        throw 'Could not insert seller';
    }

    const newId = insertedSeller.insertedId;
    const newseller = await getSeller(newId.toString());

    return newseller;

}

async function getAllSellers() {

    const sellersCollection = await sellers();
    const sellersList = await sellersCollection.find({}).toArray();

    sellersList.forEach((seller) => {
        seller._id = seller._id.toString();
    });

    return sellersList;

}


module.exports = {
    getSeller,
    insertNewSeller,
    getAllSellers
}