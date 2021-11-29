const { MongoDataSource } = require('apollo-datasource-mongodb');
const { UserInputError } = require('apollo-server-errors');
const GeoJsonPoint = require('../../DataModel/GeoJson/GeoJsonPoint');


class GeocodedLocationDataSource extends MongoDataSource {

    milesToRadian(miles) {
        if(!isFinite(miles) || miles < 0) { throw new UserInputError("Provided miles must be a non-negative number")}
        /// https://docs.mongodb.com/manual/tutorial/calculate-distances-using-spherical-geometry-with-2d-geospatial-indexes/
        const earthRadiusInMiles = 3963.2;
        return miles / earthRadiusInMiles;
    };



    /// Convenience wrapper for a location query which converts miles to Radians 
    async locationsWithinMileRadius(centerPoint, radius) {
        return await this.locationsWithinRadianRadius(centerPoint, this.milesToRadian(radius))
    }

    /// Find all data points within the provided radius, in radians, from the center point
    async locationsWithinRadianRadius(centerPoint, radius) {
        if (!isFinite(radius) || radius < 0) { throw new UserInputError("Radians must be non negative!"); }
        if (! (centerPoint instanceof GeoJsonPoint) ) { throw new Error("Center point must be a GeoJson point!")}
        const results = (await this.collection.find({
            location: { 
                $geoWithin: { 
                    $centerSphere: [ centerPoint.coordinateArray, radius ] 
                } 
            }
        })
        .toArray())

        return results
                .map(e => new GeoJsonPoint(e.location.coordinates))
    }

}

module.exports = GeocodedLocationDataSource;