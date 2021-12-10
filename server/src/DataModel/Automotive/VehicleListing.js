const { applyValidation, validateNonBlankString, validateNonNegativeInteger, validatePositiveFloat} = require('../Validation/ObjectProperties');
const GeoJsonPoint = require('../GeoJson/GeoJsonPoint')
const VehicleMetadata = require('./VehicleMetadata');

/// Data object of a listing which performs validations of constraints upon construction and converting between
/// different representations 
class VehicleListing {
    constructor(dictionary) {

        const {location, photos} = dictionary;

        const stringKeys = ["vin", "sellerId", "exteriorColor", "interiorColor"]
        
        applyValidation(stringKeys, dictionary, validateNonBlankString, this)
        applyValidation(["millage"], dictionary, validateNonNegativeInteger, this);
        applyValidation(["price"], dictionary, validatePositiveFloat, this);
        this.location = new GeoJsonPoint(location);
        this.metadata = new VehicleMetadata(dictionary.metadata);
        if(Array.isArray(photos) && photos.length > 0) {
            console.error("Photos array validation is not implemented, passing empty array instead")
        }
        this.photos = []
    }

    asDictionary(coordinatesAsArray = true) {
        const dictionary = {
            ...this,
            location: coordinatesAsArray ? this.location.coordinateArray : this.location.geoJson,
            metadata: this.metadata.asDictionary(),
        }
        return dictionary;
    }

}

module.exports = VehicleListing;