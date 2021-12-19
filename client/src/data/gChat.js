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

async function putUrl(url, body, config) {
    return axios.put(url, body, {
        ...config,
        validateStatus: (status) => status < 500,
    });
}

export async function postGlobalChatMessage(message) {

    const header = await createHeader();
    const { data, status } = await postUrl(
        `http://localhost:3001/chats/insertGlobalChat`,
        {
            chat: message
        },
        header
    );
    return { data, status };

}

export async function getAllGlobalChats() {

    const header = await createHeader();
    const { data, status } = await getUrl(
        `http://localhost:3001/chats/getGlobalChats`,
        header
    );
    return { data, status };

}