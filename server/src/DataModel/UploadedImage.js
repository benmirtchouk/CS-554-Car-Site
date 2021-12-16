const { applyValidation, validateNonBlankString, validateIsObjectId  } = require('./Validation/ObjectProperties');

class UploadedImage {
    constructor(dictionary) {
        applyValidation(["_id"], dictionary, validateIsObjectId, this);
        this._idString = this._id.toString();
        applyValidation(["filename"], dictionary, validateNonBlankString, this);
    }

    asDictionary() {
        return {
            _id: this._idString,
            filename: this.filename
        }
    }
}

module.exports = UploadedImage;