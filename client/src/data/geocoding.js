import axios from "axios";

async function queryUrl(url, config) {
  return axios.get(url, {
    ...config,
    validateStatus: (status) => status < 500,
  });
}

// eslint-disable-next-line import/prefer-default-export
export async function geocodeAddress(address) {
  const urlSafeAddress = address
    .trim()
    .split(" ")
    .filter((e) => e !== "")
    .join("+");

  const { data, status } = await queryUrl(
    `https://nominatim.openstreetmap.org/search?format=json&q=${urlSafeAddress}&output=json`
  );
  return { data, status };
}
