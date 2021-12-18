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
  const account = {
    firstName: null,
    lastName: null,
    displayName: null,
    phoneNumber: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zipCode: null,
  };
  const header = await createHeader();
  const { data, status } = await postUrl(
    `http://localhost:3001/account`,
    account,
    header
  );
  return { data, status };
}

export async function getAccount(id = null) {
  // console.log(`calling http://localhost:3001/account to get an account using getUrl`);
  
  const baseURL=`http://localhost:3001/account`
  const url = typeof id === 'string' ? `${baseURL}/by/${id}` : baseURL;
  
  
  const header = await createHeader();
  const { data, status } = await queryUrl(
    url,
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
