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
export async function getMostListedSellers(limit = 20, offset = 0) {
    const header = await createHeader();
    const { data, status } = await getUrl(
      `http://localhost:3001/seller/mostListed?limit=${limit}&offset=${offset}`,
      header
    );
    return { data, status };
  }