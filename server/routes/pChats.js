const express = require("express");
const router = express.Router();
const pChatsData = require('../src/MongoOperations/privateChat');

router.get('/getPrivateChats/:room', async (req, res) => {

    try {

        console.log("getPrivateChats route hit");

        const room = req.params.room;

        if (!room || typeof room !== 'string' || room.trim().length === 0) {
            res.status(400).json({ error: 'invalid room parameter received in route' });
            return;
        }

        console.log("room:", room);
        const messageThread = await pChatsData.getPrivateChat(room);

        console.log("router output:", messageThread);

        res.json(messageThread);

    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
    }

});

router.post('/insertPrivateChat', async (req, res) => {

    try {

        console.log("insertPrivateChat route fired");

        const { room, message } = req.body;

        if (!room || typeof room !== 'string' || room.trim().length === 0) {
            res.status(400).json({ error: 'invalid room parameter received in route' });
            return;
        }

        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            res.status(400).json({ error: 'invalid message parameter received in route' });
            return;
        }

        const updatedMessageThread = await pChatsData.insertPrivateChat(room, message);
        res.json(updatedMessageThread);

    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
    }

});

module.exports = router;