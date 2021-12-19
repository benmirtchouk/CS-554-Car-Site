const nhtsaData = require("./nhtsa");
const searchData = require("./search");
const listingData = require("./listing");
const accountData = require("./account");
const geocodeData = require("./geocoding");
const sellerData = require("./seller");
const gChat = require('./gChat');

module.exports = {
  nhtsa: nhtsaData,
  search: searchData,
  listing: listingData,
  account: accountData,
  geocode: geocodeData,
  seller: sellerData,
  gChat: gChat
};
