const express = require("express");
const router = express.Router();
const gChatsData = require('../src/MongoOperations/globalChat');

// get list of all global chats
router.get('/getGlobalChats', async (req, res) => {

    console.log("route hit line 8");
    try {
        const allChats = await gChatsData.getAllMessages();
        res.json(allChats);
        console.log("chat get route hit");
    } catch (e) {
        res.status(500).json({ error: e });
    }

});

// insert in the list of global chats
router.post('/insertGlobalChat', async (req, res) => {

    // console.log("route hit line 22");
    const chatMessage = req.body;
    // console.log(chatMessage);

    if (!chatMessage || typeof chatMessage !== 'object' || Array.isArray(chatMessage)) {
        res.status(400).json({ error: 'invalid format of chat message' });
        console.log("Invalid chatMessage format received");
    }

    if (chatMessage.length === 0) {
        console.log('empty message received');
    }

    try {
        const newChat = await gChatsData.insertChat(chatMessage);
        console.log('inserted chat:', newChat);
        res.json(newChat);
        console.log("chat insert route hit");
    } catch (e) {
        res.status(500).json({ error: e });
        console.log(e);
    }

});

module.exports = router;