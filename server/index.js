require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.listen(port, () => {
  console.log(`currently listening on port, ${port}`);
})