const { globalChats } = require('../config/mongoCollections');
let { ObjectId } = require('mongodb');

const getChat = async (id) => {

    if (!id) {
        throw 'Id parameter must be supplied';
    }

    if (typeof id !== 'string' || id.trim().length === 0) {
        throw "Id must be a non-empty string";
    }

    let parsedId;
    try {
        parsedId = ObjectId(id);
    } catch (error) {
        throw `Received invalid id: ${id}`;
    }

    const gChatsCollection = await globalChats();
    const chat = await gChatsCollection.findOne({ _id: parsedId });

    if (chat === null) {
        throw `No chat with id ${id}`;
    }

    chat._id = chat._id.toString();
    return chat;
}

const insertChat = async (message) => {

    if (!message || typeof message !== 'object' || Array.isArray(message)) {
        res.status(400).json({ error: 'invalid format of chat message' });
        console.log("Invalid chatMessage format received");
    }

    const gChatsCollection = await globalChats();
    const insertedChat = await gChatsCollection.insertOne(message);

    if (insertedChat.insertedCount === 0) {
        throw 'Could not insert chat.';
    }

    const newId = insertedChat.insertedId;
    const chat = await getChat(newId.toString());

    return chat;
}

const getAllMessages = async () => {

    const gChatsCollection = await globalChats();
    const chatsList = await gChatsCollection.find({}).toArray();

    chatsList.forEach((chat) => {
        chat._id = chat._id.toString();
    });

    return chatsList;
}


module.exports = {
    insertChat,
    getAllMessages
}