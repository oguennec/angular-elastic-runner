var express = require("express");
var path = require('path')
var app = express();
var port = 8089;

//var es = require('./server/elasticsearch')();
//var esClient = require('./server/elasticSearch');

var globals = require('./globals');

//var globals = {
//    'rootPath': path.resolve(__dirname);
//}

//module.exports = globals;

//global.rootPath = process.env.PWD;
//global.rootPath = path.resolve(__dirname);
//console.log('global.rootPath',global.rootPath);

//app.use(function(req, res, next) {
//  req.rootPath = __dirname;
//  next();
//});

app.use(express.static(path.join(__dirname + '/server')));
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/public-lib')));

require('./server/routes')(app);

//app.use(function(req, res) {
//    res.sendFile(__dirname + '/public/index.html');
//});

app.listen(port, function () {
    console.log('Running on http://localhost:' + port);
})
