const axios = require('axios');

async function queryUrl(url) {
  return await axios.get(url, { validateStatus: (status) => status < 500 });
}

module.exports = {
  queryUrl
};