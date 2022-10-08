var currentImageData;
const path = require("path");
var compressjs = require('compressjs');
var algorithmCompress = compressjs.Lzjb;
const fileUpload = require("express-fileupload");
const express = require('express')
const app = express()

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use(express.static(__dirname));

app.post('/poststreamdata', (req, res) => {
  var file = req.files[Object.keys(req.files)[0]];
  var bufferResult = new Buffer.from(algorithmCompress.decompressFile(file.data));
  if (bufferResult != null) {
    currentImageData = bufferResult;
  }
  else {
    res.send("Error!");
  }
})

app.get('/getstreamdata', (req, res) => {
  res.send(currentImageData);
})

app.listen(3000)