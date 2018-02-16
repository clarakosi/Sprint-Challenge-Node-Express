const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;
const STATUS_ERRO = 422;

app.use(bodyParser.json());



app.listen(PORT, err => {
  if (err) {
    console.log(`Error starting your application on port ${PORT}`);
  } else {
    console.log(`Your application is running on port ${PORT}`);
  }
});