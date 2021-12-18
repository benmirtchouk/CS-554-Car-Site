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

io.on('connection', (socket) => {
  console.log("new connection", socket.id);

  socket.on('join', user => {
    // let split = roomName.split('--with--');
    console.log(`join request from romm: ${user}`)

    // ensure two users trying to join can join in the same room
    // assumption: all usernames must be unique!
    // let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1));
    // let updatedRoomName = `${unique[0]}--with--${unique[1]}`;

    // Array.from(socket.rooms)
    //   .filter(it => it !== socket.id)
    //   .forEach(id => {
    //     socket.leave(id);
    //     socket.removeAllListeners(`message`);
    //   });

    // socket.join(updatedRoomName);
  });

  socket.on(`message`, message => {
    Array.from(socket.rooms)
      // .filter(it => it !== socket.id)
      .forEach(id => {
        socket.to(id).emit('message', message);
      });
  });

  socket.on('disconnect', () => {
    console.log(socket.id + ' ==== diconnected');
    socket.removeAllListeners();
  });

});

http.listen(3001, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3001');
});
