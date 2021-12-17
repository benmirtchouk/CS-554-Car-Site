const {applyValidation, validateNonNegativeInteger, validatePositiveInteger } = require("./DataModel/Validation/ObjectProperties")
class PaginationRequest {
    constructor(dictionary, defaultLimit = 10) {
        const {limit, offset} = dictionary
        applyValidation(["limit"], {limit: limit || defaultLimit}, validatePositiveInteger, this);
        applyValidation(["offset"], {offset: offset || 0 }, validateNonNegativeInteger, this);
    }
}

module.exports = PaginationRequest;