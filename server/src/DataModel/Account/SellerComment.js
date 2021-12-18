const { applyValidation, validateNonBlankString } = require("../Validation/ObjectProperties");


class SellerComment {
    constructor(dictionary) {
        applyValidation(["commentText", "posterId", "displayName"], dictionary, validateNonBlankString, this);
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