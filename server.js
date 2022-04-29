// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) =>{
  let inputDate = req.params.date,
    gmt = new Date(inputDate).toUTCString(),
    unx = Math.floor(new Date(Number(inputDate)).getTime()),
    inv = {error: 'Invalid Date'},
    result = {unix: unx, utc: gmt};
  if (inputDate === '' || inputDate === undefined) {
    inputDate = new Date();
    gmt = inputDate.toUTCString();
    unx = inputDate.getTime();
    result.unix = unx;
    result.utc = gmt;
    res.json(result);
  } else if (gmt == 'Invalid Date' && Number.isNaN(unx)) {
    res.json(inv);
  } else if (gmt == 'Invalid Date' && Number(unx)) {
    gmt = new Date(Number(inputDate)).toUTCString();
    result.utc = gmt;
    res.json(result);
  } else if (gmt != 'Invalid Date' && Number.isNaN(unx)) {
    unx = Math.floor(new Date(inputDate).getTime());
    result.unix = unx;
    res.json(result);
  }
});


// listen for requests :)
let listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});


/* v1

app.get('/api/:date', (req, res) =>{
  let date = req.params.date,
    err = {error: 'Invalid Date'},
    gmt,
    unx,
    re = /-/,
    x = new Date(date);
  console.log(x);
  if (!date) {
    console.log('empty');
  }
  if (re.test(date)) {
    if (new Date(date) == 'Invalid Date') {
      return res.json(err);
    }
    gmt = new Date(date).toUTCString();
    unx = Math.floor(new Date(date).getTime());
  } else {
    if (new Date(Number(date)).toUTCString() == 'Invalid Date') {
      return res.json(err);
    }
    gmt = new Date(Number(date)).toUTCString();
    unx = Number(date);
  }
  res.json({unix: unx, utc: gmt});
});

*/

/* v2

app.get('/api/:date', (err, req, res) =>{
  let date = new Date(req.params.date),
    err = {error: 'Invalid Date'},
    gmt,
    unx,
    re = /-/,
  console.log(date);
  if (!date) {
    console.log('empty');
  }
  if (date == 'Invalid Date') {
    return res.json(err);
  }
  if (re.test(req.params.date)) {
    gmt = date.toUTCString();
    unx = Math.floor(date.getTime());
  } else {
    gmt = date.toUTCString();
    unx = Math.floor(date.getTime());
  }
  res.json({unix: unx, utc: gmt});
});

*/