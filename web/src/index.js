var express = require("express");
var path = require('path')
var app = express();
var port = 8086;

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/public-lib')));
app.listen(port, function () {
    console.log('Running on http://localhost:' + port);
})
