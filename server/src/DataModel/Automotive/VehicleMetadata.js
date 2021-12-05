const { applyValidation, validateNonBlankString, validateNullOrNonBlankString, validateNonNegativeInteger} = require('../Validation/ObjectProperties');

/// Representation of Vehicle Metadata from the NHSTA 
/// These fields are expected to be immutable once created and a single object can be used between listings
class VehicleMetadata {
    constructor(dictionary) {

        const stringKeys = ["make", "model", "manufacturer"]
        applyValidation(stringKeys, dictionary, validateNonBlankString, this);

        this.nullableStringKeys = ["bodyClass", "driveType", "doors"];
        applyValidation(this.nullableStringKeys, dictionary, validateNullOrNonBlankString, this);

        const intKeys = ["modelYear", "makeId", "manufacturerId", "modelId"]
        applyValidation(intKeys, dictionary, validateNonNegativeInteger, this);
    }

    asDictionary() {
        const dictionary = {
            make: this.make,
            model: this.model,
            manufacturer: this.manufacturer,
            modelYear: this.modelYear,
            makeId: this.makeId,
            manufacturerId: this.manufacturerId,
            modelId: this.modelId
        }

        for(const key of this.nullableStringKeys){
            if(this[key]){
                dictionary[key] = this[key];
            }
        }
        return dictionary;
    }
}

module.exports = VehicleMetadata;