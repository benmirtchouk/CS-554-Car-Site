
/// Abstract base class for all GeoJsonTypes supported by Mongo. This class performs the validation that points
/// are correctly formatted, within valid bounds, and that each property is established
class GeoJsonType {

    /// coordinates formats are: an array of two floats (longitude first), or an object with longitude and latitude keys
    ///    Longitude must be in the range [-180, 180] and latitude [-90, 90]
    /// Type must be a supported type in Mongo *and* have a valid sub class for logic 
    constructor(coordinates, type) {
        if(this.constructor === GeoJsonType) {
            throw new Error("GeoJsonType is abstract and should not be instantiated directly!")
        }

        if(!coordinates) {
            throw new InvalidCoordinateType("Co-ordinates parameter cannot be null");
        }
        
        /// Normalize between all potential input formats. Either the raw array, the mongo geoJSON object, or the REST input format
        let normalizedCoordinates;
        if (Array.isArray(coordinates)) {
            normalizedCoordinates = coordinates
        } else if (coordinates.type && Array.isArray(coordinates.coordinates)) {
            normalizedCoordinates = coordinates.coordinates
        } else {
            const {longitude, latitude} = coordinates;
            normalizedCoordinates = [longitude, latitude].filter(e => e != null)
        }
        
        if( normalizedCoordinates.length !== 2 ) {
            console.log(coordinates)
            console.log(normalizedCoordinates)
            throw new InvalidCoordinateType("Co-ordinates parameter is not a GeoJson coordinates object!")
        }

        const [longitude, latitude] = normalizedCoordinates;
        const abs = Math.abs;

        /// Validate Longitude and Latitude are in the correct bounds
        const maxLongitude = 180;
        if( !isFinite(longitude) || abs(longitude) - maxLongitude > 0  ) {
            throw new InvalidCoordinateType("Longitude must be a number between -180 and 180");
        }
        this.longitude = longitude

        const maxLatitude = 90;
        if (!isFinite(latitude) || abs(latitude) - maxLatitude > 0) {
            throw new InvalidCoordinateType("Latitude must be a number between -90 and 90");
        }

        this.latitude = latitude;

        /// Populate properties
        this.coordinateArray = [longitude - 0, latitude - 0]
        this.coordinateJson = { longitude: longitude - 0, latitude: latitude - 0}

        /// Full valid types are https://docs.mongodb.com/manual/reference/geojson/
        /// Currently set to only Point as that is the only logic implemented. If a new sub class is added,
        /// Update this array and ensure all base class logic works correctly for the new type.
        const validTypes = new Set(["Point"])
        if (typeof type !== 'string' || !validTypes.has(type)) {
            throw new Error("Specified type is not a supported GeoJSONtype");
        }
        this.type = type;

        this.geoJson = {type: this.type, coordinates: this.coordinateArray }
    }
}

/// Thrown on any cases where a co-ordinate type is incorrect
class InvalidCoordinateType extends Error { }


module.exports = {
    GeoJsonType,
    InvalidCoordinateType
}