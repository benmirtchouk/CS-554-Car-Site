const axios = require('axios');



module.exports = {

    /// Fetch data from a given URL, returning null if the request fails.
    fetchFromURL: async (url) => {
        if (typeof url !== 'string' || url === "") { throw new Error("Url cannot be empty") }
        try {
            const { data } = await axios.get(url)
            return data
        } catch (e) {
            console.error(`Failed to fetch ${e}`);
            return null;
        }
    }

}