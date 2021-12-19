const { privateChats } = require('../config/mongoCollections');
let { ObjectId } = require('mongodb');


const insertPrivateChat = async (room, message) => {

    if (!room || typeof room !== 'string') {
        throw `invalid room input in mongo operations.`;
    }

    if (!message || typeof message !== 'string') {
        throw 'invalid message input in mongo operations';
    }

    const pChatsCollection = await privateChats();

    const roomRecord = await pChatsCollection.findOne({ room: room });

    if (roomRecord === null) { // new room
        const insertedRoom = await pChatsCollection.insertOne({
            room: room,
            messages: [message]
        });

        if (insertedRoom.insertedCount === 0) {
            throw 'Could not insert chat.';
        }

        const res = await pChatsCollection.findOne({ room: room });
        res._id = res._id.toString();

        return res;
    }

    const _ = await pChatsCollection.updateOne(
        { room: room },
        { $push: { messages: message } }
    )

    return await pChatsCollection.findOne({ room: room });

}

const getPrivateChat = async (room) => {

    if (!room || typeof room !== 'string') {
        throw `invalid room input in mongo operations.`;
    }

    const pChatsCollection = await privateChats();
    console.log("here in line49");

    let roomRecord
    try {
        roomRecord = await pChatsCollection.findOne({ room: room });
    } catch (e) {
        console.log(e);
    }

    console.log("roomRecord", roomRecord)

    if (roomRecord === null) { // room did not exist before
        return [];
    }

    return roomRecord.messages;
}

module.exports = {
    insertPrivateChat,
    getPrivateChat

}