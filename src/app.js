const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;
const STATUS_ERROR = 422;

app.use(bodyParser.json());

app.get('/compare', (req, res) => {
  const result = {};
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const yesterday = date.toISOString().slice(0,10);

  fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
  .then(res => res.json())
  .then(json => {
    result.Today = json.bpi.USD.rate;
    result.Today = parseFloat(result.Today.replace(/,/g,''))
  })
  .then(() => fetch('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday')
    .then(res => res.json())
    .then(json => {
      result.Yesterday = json.bpi[yesterday];
      result.Change = result.Today - result.Yesterday
      res.json(result)
    }))
  .catch(err => {
    console.log(err);
    res.status(STATUS_ERROR);
    res.send('There seems to be an error with your API request.')
  })
});


app.listen(PORT, err => {
  if (err) {
    console.log(`Error starting your application on port ${PORT}`);
  } else {
    console.log(`Your application is running on port ${PORT}`);
  }
});