require('dotenv').config();
const controller = require('./controllers.js');
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;
const { db } = require('../db/index.js');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.get('/community/songs', controller.getSongs);

app.post('/community/songs', controller.postSong);

app.listen(port, () => {
  console.log(`currently listening on http://localhost:${port}`);

})