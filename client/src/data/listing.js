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

// async function getUrl(url, config) {
//   return axios.get(url, {
//     ...config,
//     validateStatus: (status) => status < 500,
//   });
// }
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

export async function asd() {
  return 7;
}