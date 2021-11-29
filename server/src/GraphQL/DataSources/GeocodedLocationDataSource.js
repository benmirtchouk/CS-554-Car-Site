const { MongoDataSource } = require('apollo-datasource-mongodb');
const { UserInputError } = require('apollo-server-errors');


class GeocodedLocationDataSource extends MongoDataSource {

    milesToRadian(miles) {
        if(!isFinite(miles) || miles < 0) { throw new UserInputError("Provided miles must be a non-negative number")}
        /// https://docs.mongodb.com/manual/tutorial/calculate-distances-using-spherical-geometry-with-2d-geospatial-indexes/
        const earthRadiusInMiles = 3963.2;
        return miles / earthRadiusInMiles;
    };



    async locationsWithinMileRadius(centerPoint, radius) {
        return await this.locationsWithinRadianRadius(centerPoint, this.milesToRadian(radius))
    }


    async locationsWithinRadianRadius(centerPoint, radius) {
        if (!isFinite(radius) || radius < 0) { throw new UserInputError("Radians must be non negative!"); }
        const results = (await this.collection.find({
            location: { 
                $geoWithin: { 
                    $centerSphere: [ centerPoint, radius ] 
                } 
            }

        })
        .toArray())

        return results
                .map(e => e.location.coordinates)
                .map(e => { return { longitude: e[0], latitude:e[1] }})
    }

}

module.exports = GeocodedLocationDataSource;