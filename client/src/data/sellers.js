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

async function getAllSellersData() {
    // console.log(`calling http://localhost:3001/sellers to get an account using getUrl`);
    const header = await createHeader();
    const { data, status } = await queryUrl(
        `http://localhost:3001/sellers`,
        header
    );
    return { data, status };
}

export default getAllSellersData;