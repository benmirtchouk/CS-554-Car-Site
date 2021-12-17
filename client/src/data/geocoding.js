import axios from "axios";

async function queryUrl(url, config) {
  return axios.get(url, {
    ...config,
    validateStatus: (status) => status < 500,
  });
}

// eslint-disable-next-line import/prefer-default-export
export async function geocodeAddress(address) {

    const { data, status} = await queryUrl(
      `http://localhost:3001/geocode/address?address=${address}`
    )
    alert(status);
  return { data, status };
}
