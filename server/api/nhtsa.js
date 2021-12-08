const { queryUrl } = require('./util');

/**
 * Convert the key names of the NHSTA to a key name usable by the server
 * @param {String} key The key the server uses
 * @returns Forces the force character to lowercase, and  normalizes `ID` and `Id` to be `Id`
 */
function normalizeKey(key) {
  key = key.replace("ID", "Id");
  return  key.charAt(0).toLowerCase() + key.slice(1);
}


async function decodeShortVin(vin) {
  const { data, status }  = await queryUrl(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`);
  if (data == null) { return createReturnObject(null, status)  } ;
  if (data.Results.length<1)  { return createReturnObject(null, 404) } ;

  // create a variable to return
  let vehicleDetails={};
  let info;
  let flds = ["Make", "Model", "ModelYear", "Manufacturer", "ManufacturerName",
  "PlantCountry", "PlantState", "PlantCity",
  "VehicleType", "BodyClass", "Doors", "Windows", "DriveType",
  "EngineConfiguration", "TransmissionStyle", "VehicleId"
]

  flds.forEach((field, indx) => {
    info=data.Results.find(obj=>obj.Variable.replace(' ','') === field);
    if (info===undefined)
      vehicleDetails[field]="Unknown Field";
    else {
      let fld=info.Variable.replace(' ', '');
      if (info.Value===null)
        vehicleDetails[fld]="Unknown";
      else
        vehicleDetails[fld]=info.Value;
    }
  });

  //return createReturnObject({data: vehicleDetails})
  return ({"data":vehicleDetails, "status": 200});

}

async function decodeVin(vin) {
  const { data, status }  = await queryUrl(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${vin}?format=json`);
  if (data == null) { return createReturnObject(null, status)  } ;
  const results  =  data.Results?.length > 0 ?  data.Results[0] : null ; 
  if (results == null)  { return createReturnObject(null, 404) } ;

  const variablesOfInterest = new Set( 
    ["Make", "Manufacturer", "Model", "ModelYear", "MakeID", "ManufacturerId", "ModelID", "BodyClass", "DriveType", "Doors"]
  )

  const vehicleDetails =  Object.keys(results)
                          .filter(e => variablesOfInterest.has(e))
                          .reduce((acc, e) => { return {...acc, [normalizeKey(e)]: results[e]} }, {})
  /// As vin is in all caps, set the key manually 
  vehicleDetails.vin = results.VIN || vin;
  return {data: vehicleDetails};

}

async function decodeWmi(wmi) {
  return queryUrl(`https://vpic.nhtsa.dot.gov/api/vehicles/decodewmi/${wmi}?format=json`);
}
async function getWMIsForManufacturer(manufacturerId) {
  return queryUrl(`https://vpic.nhtsa.dot.gov/api/vehicles/GetWMIsForManufacturer/${manufacturerId}?format=json`);
}
async function getAllMakes() {
  return queryUrl(`https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json`);
}
async function getParts(type) {
  return queryUrl(`https://vpic.nhtsa.dot.gov/api/vehicles/GetParts?type=${type}&format=json`);
}
async function getManufacturers(pageNum) {
  return queryUrl(`https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?page=${pageNum}&format=json`);
}
async function getManufacturerDetails(manufacturerId) {
  return queryUrl(`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${manufacturerId}?format=json`);
}
async function getMakeForManufacturer(manufacturerId) {
  return queryUrl(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakeForManufacturer/${manufacturerId}?format=json`);
}
async function getModelsForMakeId(makeId) {
  return queryUrl(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${makeId}?format=json`);
}
async function getVehicleIds(id) {
  return queryUrl(`https://api.nhtsa.gov/SafetyRatings/VehicleId/${id}`);
}
async function getSafetyVehicleIds(make, model, year) {
  return queryUrl(`https://api.nhtsa.gov/SafetyRatings/modelyear/${year}/make/${make}/model/${model}`);
}
async function getSafetyData(id) {
  return queryUrl(`https://api.nhtsa.gov/SafetyRatings/VehicleId/${id}`);
}
async function getSafetyMakesForModelYear(year) {
  return queryUrl(`https://api.nhtsa.gov/SafetyRatings/modelyear/${year}`);
}
async function getSafetyModelsForMakeModelYear(make, year) {
  return queryUrl(`https://api.nhtsa.gov/SafetyRatings/modelyear/${year}/make/${make}`);
}
async function getRecallData(make, model, year) {
  return queryUrl(`https://api.nhtsa.gov/recalls/recallsByVehicle?make=${req.params.make}&model=${req.params.model}&modelYear=${req.params.year}`);
}

module.exports = {
  decodeShortVin,
  decodeVin,
  decodeWmi,
  getWMIsForManufacturer,
  getAllMakes,
  getParts,
  getManufacturers,
  getManufacturerDetails,
  getMakeForManufacturer,
  getModelsForMakeId,
  getSafetyVehicleIds,
  getSafetyMakesForModelYear,
  getSafetyModelsForMakeModelYear,
  getSafetyData,
  getRecallData,
};
