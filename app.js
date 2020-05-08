const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.listen(3000, () => console.log('Listening to port 3000'));
