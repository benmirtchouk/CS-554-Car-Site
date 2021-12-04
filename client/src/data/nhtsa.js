import axios from 'axios';
import firebaseApp from "../firebase/Firebase";

async function createHeader() {
  const user = firebaseApp.auth().currentUser;
  const token = user && (await user.getIdToken());

  return {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `${token}` } : undefined),
    },
  };
}

async function queryUrl(url, config) {
  return axios.get(url, { ...config, validateStatus: (status) => status < 500 });
}

export async function decodeVin(vin) {
  const header = await createHeader();
  const { data, status } = await queryUrl(`http://localhost:3001/cars/decodeVin/${vin}`, header);
  return { data, status };
}

export async function decodeWmi(wmi) {
  const header = await createHeader();
  const { data, status } = await queryUrl(`http://localhost:3001/cars/decodeWmi/${wmi}`, header);
  return { data, status };
}

export async function getWMIsForManufacturer(manufacturerId) {
  const header = await createHeader();
  const { data, status } = await queryUrl(`http://localhost:3001/cars/getWMIsForManufacturer/${manufacturerId}`, header);
  return { data, status };
}

export async function getAllMakes() {
  const header = await createHeader();
  const { data, status } = await queryUrl(`http://localhost:3001/cars/getAllMakes`, header);
  return { data, status };
}

export async function getParts(type) {
  const header = await createHeader();
  const { data, status } = await queryUrl(`http://localhost:3001/cars/getParts/${type}`, header);
  return { data, status };
}

export async function manufacturers(pageNum) {
  const header = await createHeader();
  const { data, status } = await queryUrl(`http://localhost:3001/cars/manufacturers/${pageNum}`, header);
  return { data, status };
}

export async function getManufacturerDetails(manufacturerId) {
  const header = await createHeader();
  const { data, status } = await queryUrl(`http://localhost:3001/cars/getManufacturerDetails/${manufacturerId}`, header);
  return { data, status };
}

export async function getMakeForManufacturer(manufacturerId) {
  const header = await createHeader();
  const { data, status } = await queryUrl(`http://localhost:3001/cars/getMakeForManufacturer/${manufacturerId}`, header);
  return { data, status };
}

export async function getModelsForMakeId(makeId) {
  const header = await createHeader();
  const { data, status } = await queryUrl(`http://localhost:3001/cars/getModelsForMakeId/${makeId}`, header);
  return { data, status };
}