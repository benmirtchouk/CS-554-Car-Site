const nhtsaData = require("./nhtsa");
const searchData = require("./search");
const listingData = require("./listing");
const accountData = require("./account");
const geocodeData = require("./geocoding");

module.exports = {
  nhtsa: nhtsaData,
  search: searchData,
  listing: listingData,
  account: accountData,
  geocode: geocodeData,
};
