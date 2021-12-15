const { GridFSBucket } = require("mongodb");
const dbConnection = require("./mongoConnection");

 const getBucket = (bucketName) => {

    let _bucket = undefined;

    return async () => {
        if(!_bucket) {
            const db = await dbConnection();
            _bucket = new GridFSBucket(db, {bucketName: bucketName} );
        }
        return _bucket
    }
};

/* Now, you can list your collections here: */
module.exports = {
   listingImages: getBucket("listingImages"),
};
