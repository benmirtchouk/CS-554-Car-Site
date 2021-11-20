const fetching = require('../AxiosRequesting');
const { UserInputError} = require('apollo-server')

class MalformedVinException extends UserInputError {
    constructor(vin, message) {
        super(message)
        this.vin = vin;
    }
}

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


/// Perform trivial validation if the vin is valid before sending off to the upstream
/// Any vin before 1981 (which may be as short as 11 digits), or not for the North American market may return false
/// This function does not attempt to do any decoding or checking for illegal characters. 
const isPotentiallyValidVin = (vin) => {
    /// Regex confirms the string has no leading/trailing spaces without a trim(), as the calling code may not provide
    return typeof vin === "string" && vin.length === 17 && vin.match(/^[a-z0-9]+$/i)
}


const vinQueryURL = async (vin) => {
    if(!isPotentiallyValidVin(vin)) { throw new MalformedVinException(vin, "Vin value is malformed.") }

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
    vinQueryURL,
    MalformedVinException
}