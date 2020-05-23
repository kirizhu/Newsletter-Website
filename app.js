const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');
require('dotenv').config();
const axios = require('axios').default;
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/failure', (req, res) => {
  res.redirect('/');
});

app.post('/', (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  console.log(fname, lname, email);

  //TODO: create js obj to fit mailchimp
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };
  //TODO: stringify obj to json
  const jsonData = JSON.stringify(data);
  //TODO: axios post request to mailchimp
  const url = 'https://us18.api.mailchimp.com/3.0/lists/' + process.env.LIST_ID;

  axios
    .post(url, jsonData, {
      auth: {
        username: 'Kiribaty', // anystring
        password: process.env.API_KEY, // Your API key
      },
    })
    .then((response) => {
      if (response.status === 200) {
        res.sendFile(__dirname + '/success.html');
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendFile(__dirname + '/failure.html');
    });
});

app.listen(process.env.PORT || 3000, () =>
  console.log('Listening to port 3000')
);
//TODO: env
