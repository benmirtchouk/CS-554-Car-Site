const { applyValidation, validateNonBlankString, validateNonNegativeInteger, validatePositiveFloat} = require('../Validation/ObjectProperties');
const GeoJsonPoint = require('../GeoJson/GeoJsonPoint')
const VehicleMetadata = require('./VehicleMetadata');
const UploadedImage = require('../UploadedImage');

/// Data object of a listing which performs validations of constraints upon construction and converting between
/// different representations 
class VehicleListing {
    constructor(dictionary) {

        const {location, photo} = dictionary;

        const stringKeys = ["vin", "sellerId", "exteriorColor", "interiorColor"]
        
        applyValidation(stringKeys, dictionary, validateNonBlankString, this)
        applyValidation(["millage"], dictionary, validateNonNegativeInteger, this);
        applyValidation(["price"], dictionary, validatePositiveFloat, this);
        this.location = new GeoJsonPoint(location);
        this.metadata = new VehicleMetadata(dictionary.metadata);
        this.photo = dictionary.photo != null ? new UploadedImage(dictionary.photo) : null;

    }

    asDictionary(coordinatesAsArray = true) {
        const dictionary = {
            ...this,
            location: coordinatesAsArray ? this.location.coordinateArray : this.location.geoJson,
            photo: this.photo ? this.photo.asDictionary() : null,
            metadata: this.metadata.asDictionary(),
        }
        return dictionary;
    }

}

module.exports = VehicleListing;