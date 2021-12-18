const axios = require('axios');

async function queryUrl(url, userAgent = "") {
  return await axios.get(url, { 
    headers: {'User-Agent': userAgent},
    validateStatus: (status) => status < 500 
  });
}

module.exports = {
  queryUrl
};