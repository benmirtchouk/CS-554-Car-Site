const {applyValidation, validateNonNegativeInteger, validatePositiveInteger, ValidationError } = require("./DataModel/Validation/ObjectProperties")
class PaginationRequest {
    constructor(dictionary, defaultLimit = 10, maxLimit = 1000) {
        const {limit, offset} = dictionary
        applyValidation(["limit"], {limit: limit || defaultLimit}, validatePositiveInteger, this);
        if(this.limit > maxLimit) {
            throw new ValidationError(`Int less than ${maxLimit}`, `Limit is above maximum ${maxLimit}`);
        }
        applyValidation(["offset"], {offset: offset || 0 }, validateNonNegativeInteger, this);
    }
}

module.exports = PaginationRequest;