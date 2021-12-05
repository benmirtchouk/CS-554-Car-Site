const { applyValidation, validateNonBlankString, validateNullOrNonBlankString, validateNonNegativeInteger} = require('../Validation/ObjectProperties');


class VehicleMetadata {
    constructor(dictionary) {

        const stringKeys = ["make", "model", "manufacturer"]
        applyValidation(stringKeys, dictionary, validateNonBlankString, this);

        this.nullableStringKeys = ["bodyClass", "driveType", "doors"];
        applyValidation(this.nullableStringKeys, dictionary, validateNullOrNonBlankString, this);

        const intKeys = ["modelYear", "makeID", "manufacturerId", "modelID"]
        applyValidation(intKeys, dictionary, validateNonNegativeInteger, this);
    }

    asDictionary() {
        const dictionary = {
            make: this.make,
            model: this.model,
            manufacturer: this.manufacturer,
            modelYear: this.modelYear,
            makeID: this.makeID,
            manufacturerId: this.manufacturerId,
            modelID: this.modelID
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