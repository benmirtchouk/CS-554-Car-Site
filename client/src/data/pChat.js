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

export async function getPrivateMessageThread(room) {

    if (!room || typeof room !== 'string' || room.length === 0) {
        throw 'invalid argument in getPrivateMessageThread';
    }
    const header = await createHeader();
    const { data, status } = await getUrl(
        `http://localhost:3001/privateChats/getPrivateChats/${room}`,
        header
    );
    return { data, status };
}

export async function postPrivateMessage(room, message) {

    if (!room || typeof room !== 'string' || room.length === 0) {
        throw 'invalid argument room in postPrivateMessage';
    }

    if (!message || typeof message !== 'string' || message.length === 0) {
        throw 'invalid argument message in postPrivateMessage';
    }
    const header = await createHeader();
    const { data, status } = await postUrl(
        `http://localhost:3001/privateChats/insertPrivateChat`,
        {
            room: room,
            message: message
        },
        header
    );
    return { data, status };

} 