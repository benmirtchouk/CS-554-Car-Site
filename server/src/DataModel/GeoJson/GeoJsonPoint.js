const { GeoJsonType } = require("./GeoJsonType");

class GeoJsonPoint extends GeoJsonType {
    constructor(coordinates) {
        super(coordinates, "Point");
    }
}

module.exports = GeoJsonPoint;