require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const configRoutes = require('./routes');

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["cred-header"],
    credentials: true

  }
});

// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

app.use(cors());
/// Note: On large payloads this will print out a stack trace in console, but it will correctly return a `413` to the client and end the request. 
app.use(express.json({ limit: "1.1mb", type: "application/json" }));

app.use(express.urlencoded({ extended: true }));

configRoutes(app);

// userlist = {};

io.on('connection', (socket) => {
  console.log("new connection", socket.id);

  // userlist[socket.authorization_token] = socket.id;

  socket.on('user_join_leave', ({ uid, username, joined }) => {
    socket.broadcast.emit("user_join_leave", { username, joined });
  });

  socket.on('message', ({ uid, username, message }) => {
    socket.broadcast.emit("message", { username, message });
  });

  // socket.on('message_to', ({ from_uid, to_uid, message }) => {
  //   // console.log('got message', message);
  //   socket.to(userlist[to_uid]).emit('asd', 'asd');
  // });

  socket.on('disconnect', () => {
    socket.removeAllListeners();
  });
});

http.listen(3001, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3001');
});
