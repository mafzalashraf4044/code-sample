const path = require('path');
const express = require('express');

const portNumber = 4000;
let app;

const gzipFiles = ['.js'];
app = express();
app.get(gzipFiles, (req, res) => {
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('/fonts/*.ttf', (req, res) => {
  res.sendFile(path.join(__dirname, `dist/fonts/${path.basename(req.url)}`));
});
app.get('/images/*.png', (req, res) => {
  res.sendFile(path.join(__dirname, `dist/images/${path.basename(req.url)}`));
});
app.get('/images/*.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, `dist/images/${path.basename(req.url)}`));
});
app.get('/images/*.ico', (req, res) => {
  res.sendFile(path.join(__dirname, `dist/images/${path.basename(req.url)}`));
});
app.get('*.js', (req, res) => {
  res.sendFile(path.join(__dirname, `dist/${path.basename(req.url)}`));
});
app.get('*.css', (req, res) => {
  res.sendFile(path.join(__dirname, `dist/${path.basename(req.url)}`));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(portNumber, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening at http://localhost:${portNumber}`);
});
