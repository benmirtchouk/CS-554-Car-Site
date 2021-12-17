const express = require('express');
const GeoJsonPoint = require('../src/DataModel/GeoJson/GeoJsonPoint');
const router = express.Router();

const { queryUrl } = require('../api/util');


router.get("/address", async (req, res) => {
    let address = req.query.address;
    let formattedAddress = address
                            .trim()
                            .split(" ")
                            .filter((e) => e !== "")
                            .join("+");
    if(formattedAddress.length === 0) {
        return res.status(400).json({message: "Address cannot be blank"});
    }

    if (true) {
        return;
    }

    let {data, status} = await queryUrl( `https://nominatim.openstreetmap.org/search?format=json&q=${formattedAddress}&output=json`)

    if(status > 400 || !data){
        return res.status(400).json({message: "Failed to geocode"});
    }

    const firstLocation = data[0];

    const coordinates = [firstLocation.lon, firstLocation.lat];
    const displayName = firstLocation.display_name;

    let location = new GeoJsonPoint(coordinates);

    return res.json({
        location: location.coordinateArray,
        displayName
    }
    ) 
});


module.exports = router