/*******************************************************************************
 * Base provided from lecture notes of CS546.
 ******************************************************************************/
const dbConnection = require("./mongoConnection");

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection, indexCreationObject) => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const db = await dbConnection();
            _col = await db.collection(collection);

            if (indexCreationObject && typeof indexCreationObject === 'object') {
                await _col.createIndex(indexCreationObject)
            }
        }

        return _col;
    };
};

/* Now, you can list your collections here: */
module.exports = {
    listings: getCollectionFn("listings", { "location": "2dsphere" }),
    accounts: getCollectionFn("accounts", false),
    listingImageFiles: getCollectionFn("listingImages.files"),
    listingImageChunks: getCollectionFn("listingImages.chunks"),
};