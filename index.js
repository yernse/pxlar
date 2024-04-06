const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

let data = fs.readFileSync(path.join(__dirname, 'clicks.json'), 'utf8');
let clicks = JSON.parse(data);

app.post('/clicks', (req, res) => {
  clicks.globalclick++;
  fs.writeFile(path.join(__dirname, 'clicks.json'), JSON.stringify(clicks), 'utf8', function(err) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      res.json(clicks);
    }
  });
});
app.get('/click', (req, res) => {
  res.json({ clicks: clicks.globalclick });
});

app.get('/history', (req, res) => {
  fs.readFile(path.join(__dirname, 'history.json'), 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      const history = JSON.parse(data);
      res.json(history);
    }
  });
});


app.get('/new-click', (req, res) => {
  clicks.globalclick += 5;
  fs.writeFile(path.join(__dirname, 'clicks.json'), JSON.stringify(clicks), 'utf8', function(err) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      res.send('clicked on the button. 5x!');
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});