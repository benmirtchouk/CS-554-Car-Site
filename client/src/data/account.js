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

async function queryUrl(url, config) {
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

async function putUrl(url, body, config) {
  return axios.put(url, body, {
    ...config,
    validateStatus: (status) => status < 500,
  });
}

export async function createAccount() {
  // console.log(`calling http://localhost:3001/account to get an account using postUrl`);
  const account = {};
  const header = await createHeader();
  const { data, status } = await postUrl(
    `http://localhost:3001/account`,
    account,
    header
  );
  return { data, status };
}

export async function getAccount() {
  // console.log(`calling http://localhost:3001/account to get an account using getUrl`);
  const header = await createHeader();
  const { data, status } = await queryUrl(
    `http://localhost:3001/account`,
    header
  );
  return { data, status };
}

export async function updateAccount(account) {
  // console.log(`calling http://localhost:3001/account to get an account using putUrl`);
  const header = await createHeader();
  const { data, status } = await putUrl(
    `http://localhost:3001/account`,
    account,
    header
  );
  return { data, status };
}
