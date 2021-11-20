const fetching = require('../AxiosRequesting');


/// Mapping the `VariableId` field from the API response to the graphQL key names
const variableIdToGraphQLName = {
    143: "errorCode",
    156: "additionalErrorText",
    26: "make",
    27: "manufacturer", // manufacturerName
    28: "model",
    29: "year", // modelYear in API response
}

/// Map the keys to a numeric set to match the API response
const variableIdsOfInterest = new Set(Object.keys(variableIdToGraphQLName ).map(e => e - 0));


const nhtsaBaseURL = "https://vpic.nhtsa.dot.gov/api/"

const vinQueryURL = async (vin) => {
    if(typeof vin !== "string" || vin === "") { return null }
    
    const url = `${nhtsaBaseURL}/vehicles/decodevin/${vin}?format=json`
    const data = await fetching.fetchFromURL(url)
    if (!data) { return null; }
    const results  = data.Results; 

    const vehicleDetails = results
                            .filter(e => variableIdsOfInterest.has(e.VariableId))
                            .map( e =>  { return { [variableIdToGraphQLName [e.VariableId]]: e.Value}})
                            .reduce((acc, e) => { return {...acc, ...e}}, {})
    vehicleDetails.vin = vin;
    return vehicleDetails;
}


module.exports = {
    vinQueryURL
}