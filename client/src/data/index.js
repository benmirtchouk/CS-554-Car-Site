const nhtsaData = require("./nhtsa");
const searchData = require("./search");
const listingData = require("./listing");
const accountData = require("./account");

module.exports = {
  nhtsa: nhtsaData,
  search: searchData,
  listing: listingData,
  account: accountData,
};
