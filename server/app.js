require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const configRoutes = require('./routes');

app.use(cors());
/// Note: On large payloads this will print out a stack trace in console, but it will correctly return a `413` to the client and end the request. 
app.use(express.json({ limit: "1.1mb", type: "application/json" }));

app.use(express.urlencoded({ extended: true }));

configRoutes(app);

app.listen(3001, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3001');
});
