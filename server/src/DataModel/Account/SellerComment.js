const { applyValidation, validateNonBlankString, ValidationError } = require("../Validation/ObjectProperties");


class SellerComment {
    constructor(dictionary) {
        applyValidation(["commentText", "posterId", "displayName"], dictionary, validateNonBlankString, this);
        if(this.commentText.length >= 500) {
            throw new ValidationError("500LengthString", "Comments cannot be longer than 500 characters");
        }
    
    }

    asDictionary() {
        return {
            commentText: this.commentText,
            /// Keep as string, as seller id is a string in Mongo account._id
            posterId: this.posterId,
            displayName: this.displayName,
        }
    }
}

module.exports = SellerComment