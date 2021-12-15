const { listingImages }= require("../config/mongoFileStream");
const { Duplex } = require('stream');

const validImageTypes = new Set(["jpg", "jpeg", "png"]);

// https://en.wikipedia.org/wiki/List_of_file_signatures
const fileTypeMagicHexPrefix = {
    "jpg": "FFD8FF",
    "jpeg": "FFD8FF",
    "png": "89504E47"
}

/// Convert a buffer of bytes into a Duplex. This is needed as GridFS *must* take a stream
/// and the only other alternative is writing to a file. 
const imageStreamFromBuffer  = (buffer) => {
    if(!(buffer instanceof Buffer)) { return null; }
    const imageStream = new Duplex();
    imageStream.push(buffer);
    imageStream.push(null);
    return imageStream;
}

class UploadFailure extends Error { 
    
}

class UnsupportedFileType extends UploadFailure {
    constructor(type, message) {
        super(message);
        this.type = type;
    }
}

class InvalidFile extends UploadFailure {
    constructor(targetPrefix, actualPrefix, message) {
        super(message)
        this.targetPrefix = targetPrefix;
        this.actualPrefix = actualPrefix;
    }
}

/// Upload an image into GridFS for storage
/// Photo is expected to be in form of `data:<mimeType>;<encoding>,<encodedData>`
const uploadImage = async (photo, vin ) => {

    if(typeof photo !== 'string' || photo.length === 0 || 
    typeof vin !== 'string' || vin.length === 0) {
        throw new UploadFailure("Photo and vin cannot be nil");
    }

    const [header, imageData] = photo.split(",")
    if(header.length === 0 || !imageData || imageData.length === 0) {
        throw new UploadFailure("Header or image data not specified in upload");
    } 
    const [mimeType, encoding] = header.split(";");

    if(mimeType.length === 0 || !encoding || encoding.length === 0) {
        throw new UploadFailure("Encoding information is incorrect");
    }

    if(encoding !== 'base64') {
        throw new UploadFailure("Only base64 encoding supported")
    }

    const [_ignoredPrefix, fileExtension] = mimeType.split("/");
    if(!fileExtension || !validImageTypes.has(fileExtension) ) { throw new UnsupportedFileType(fileExtension || "Missing extension", "Extension is not supported")}
   
    const magicPrefix = fileTypeMagicHexPrefix[fileExtension];
    
    /// As not all prefixes correct map to base 64 without padding, trim off the added `=` padding.
    const base64magicPrefix = Buffer.from(magicPrefix, 'hex')
                            .toString('base64')
                            .replace(/=/g, "");
    const correctPrefix = imageData.startsWith(base64magicPrefix);

    if(!correctPrefix) {
        throw new InvalidFile(base64magicPrefix, imageData.substring(0, base64magicPrefix.length), "File had incorrect magic number prefix")
    }
   
    const buffer = Buffer.from(imageData, encoding);
    const imageStream = imageStreamFromBuffer(buffer);

    const fileName = `${vin}-${new Date().toISOString()}.${fileExtension}`
    const bucket = await listingImages()

    return new Promise((resolve, reject) => {
        imageStream.
        pipe(bucket.openUploadStream(fileName)).
        on('error', function(error) {
          reject(error);
        }).
        on('finish', function(e) {
          resolve(e);
        });
    })
}

module.exports = {
    UploadFailure,
    UnsupportedFileType,
    InvalidFile,
    uploadImage,
}