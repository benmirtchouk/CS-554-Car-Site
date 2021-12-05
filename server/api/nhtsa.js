const { queryUrl } = require('./util');


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
                          .reduce((acc, e) => { return {...acc, [lowercaseFirstLetter(e)]: results[e]} }, {})
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

module.exports = {
  decodeVin,
  decodeWmi,
  getWMIsForManufacturer,
  getAllMakes,
  getParts,
  getManufacturers,
  getManufacturerDetails,
  getMakeForManufacturer,
  getModelsForMakeId,
};