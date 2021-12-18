import axios from "axios";
import firebaseApp from "../firebase/Firebase";

async function createHeader() {
  const user = firebaseApp.auth().currentUser;
  const token = user && (await user.getIdToken());

  return {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `${token}` } : undefined),
    },
  };
}

async function getUrl(url, config) {
  return axios.get(url, {
    ...config,
    validateStatus: (status) => status < 500,
  });
}
async function putUrl(url, data, config) {
  return axios.put(url, data, {
    ...config,
    validateStatus: (status) => status < 500,
  });
}

export async function addListing(listing) {
  const header = await createHeader();
  const { data, status } = await putUrl(
    `http://localhost:3001/listing`,
    listing,
    header
  );
  return { data, status };
}

export async function getAllListings(limit = 20, offset = 10) {
  const header = await createHeader();
  const { data, status } = await getUrl(
    `http://localhost:3001/listing?limit=${limit}&offset=${offset}`,
    header
  );
  return { data, status };
}

export async function getListing(id) {
  const header = await createHeader();
  const { data, status } = await getUrl(
    `http://localhost:3001/listing/byId/${id}`,
    header
  );
  return { data, status };
}

export async function buyListing(id) {
  const header = await createHeader();
  const { data, status } = await getUrl(
    `http://localhost:3001/listing/buy/${id}`,
    header
  );
  return { data, status };
}

export async function getUserListings(limit = 20, offset = 10) {
  const header = await createHeader();
  const { data, status } = await getUrl(
    `http://localhost:3001/listing?user=true&limit=${limit}&offset=${offset}`,
    header
  );
  return { data, status };
}
