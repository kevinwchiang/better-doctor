const express = require('express');
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

const apiKey = '1394e1477528a6ebc925b49485c3d663';

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Success');
});

app.post('/search', (req, res) => {
  const skip = req.body.skip || 0;
  const limit = req.body.limit || 10;
  const resourceUrl = `https://api.betterdoctor.com/2016-03-01/doctors?name=${req.body.name}&location=37.773,-122.413,100&skip=${skip}&${limit}&user_key=${apiKey}`;
  request.get(resourceUrl, (error, response, body) => {
    if (!error) {
      res.json(body);
    }
  });
});

app.listen(4000, () => {
  console.log('App listening on port 4000!');
});

module.exports = app;
