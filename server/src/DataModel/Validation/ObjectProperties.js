const { ObjectId } = require("mongodb");


class ValidationError extends Error {
    constructor(expectedType, message) {
        super(message)
        this.expectedType = expectedType
    }
}

const validateNonBlankString = (string) => {
    if (string == null) { throw new ValidationError("string", "cannot be null or undefined"); }
    if (typeof string !== 'string') { throw new ValidationError("string", "is not the correct type") }
    string = string.trim()
    if (string.length === 0) { throw new ValidationError("string", "cannot be blank" )}
    return string;
}

const validateIsObjectId = (id) => {
    if(id instanceof ObjectId) {
        return id;
    }
    if(!ObjectId.isValid(id)) { throw new ValidationError("ObjectId", "Must be an object id") }
    return new ObjectId(id);
}

const validateNullOrNonBlankString = (string) => {
    if (string == null) { return null; }
    if (typeof string !== 'string') { throw new ValidationError("string", "is not the correct type") }
    string = string.trim()
    return string.length === 0 ? null : string;
}

const validateNonNegativeInteger = (int) => {
    if(!Number.isInteger(int - 0 ) || int < 0) { throw new ValidationError("integer", "must be non-negative")}
    return int - 0;
}

const validatePositiveInteger = (int) => {
    if(!Number.isInteger(int - 0 ) || int <= 0) { throw new ValidationError("integer", "must be non-negative")}
    return int - 0;
}

const validatePositiveFloat = (float) => {
    if(!isFinite(float) || float <= 0) { throw new ValidationError("float", "must be positive") }
    return float - 0;
}

const applyValidation = (keys, inputDictionary, validationFunction, onObject) => {
    if(onObject == null) { return }
    if(inputDictionary == null || typeof inputDictionary !== 'object') { throw new ValidationError("object", "Input object was null or not an object!") }
    
    for(const key of keys) {
        try {
            onObject[key] = validationFunction(inputDictionary[key])
        } catch(e) {
            if (e instanceof ValidationError) {
                e.propertyKey = key
                e.message = `${key} ${e.message}`
            }
            throw e;
        }
    }
}

module.exports = {
    ValidationError,
    validateNonBlankString,
    validateNullOrNonBlankString,
    validatePositiveInteger,
    validateNonNegativeInteger,
    validatePositiveFloat,
    validateIsObjectId,
    applyValidation,
}