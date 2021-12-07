const { queryUrl } = require('./util');


async function decodeVin(vin) {
  return queryUrl(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${vin}?format=json`);
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
