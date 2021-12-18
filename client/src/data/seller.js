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

async function postUrl(url, body, config) {
    return axios.post(url, body, {
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

export async function rateUser(sellerId, isLike, isAdding) {
    if(typeof sellerId !== 'string' || sellerId.length === 0) {
        throw new Error("Seller id cannot be empty or missing");
    }

    const header = await createHeader();
    const { data, status } = await postUrl(
      `http://localhost:3001/seller/${sellerId}/rate`,
      {
          rating: isLike ? "like" : "dislike",
          action: isAdding ? "add" : "remove"
      },
      header
    );
    return { data, status };
}