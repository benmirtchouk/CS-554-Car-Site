/* eslint-disable import/no-import-module-exports */

import axios from "axios";
import firebaseApp from "../firebase/Firebase";

const createHeader = async () => {
  const user = firebaseApp.auth().currentUser;
  const token = user && (await user.getIdToken());

  return {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `${token}` } : undefined),
    },
  };
};

const queryUrl = async (url, config) =>
  axios.get(url, {
    ...config,
    validateStatus: (status) => status < 500,
  });

const baseURL = "http://localhost:3001/search/by/";

const byVin = async (vin) => {
  if (typeof vin !== "string" || vin.length === 0) {
    throw new Error("Vin is required!");
  }
  const header = await createHeader();
  const { data, status } = await queryUrl(`${baseURL}vin/${vin}`, header);
  return { data, status };
};

const byComponents = async (query) => {
  const header = await createHeader();
  const { data, status } = await queryUrl(`${baseURL}components/`, {
    ...header,
    params: query,
  });
  return { data, status };
};

const Searches = {
  byVin,
  byComponents,
};

export default Searches;
