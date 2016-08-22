var path = require('path')

var esClient = require('./elasticSearch');

module.exports = function (app) {

    app.get('/searchdoc_source', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');

        esClient.search(req.query.searchQuery).then(function (response) {
            var recipes = [];
            var hits_in;
            var hits_out = [];
            hits_in = (response.hits || {}).hits || [];
            for (var ii = 0; ii < hits_in.length; ii++) {
                hits_out.push(hits_in[ii]._source);
            }
            recipes.push(hits_out);
            res.write(JSON.stringify(recipes));
            res.end();
        });
    });

    app.get('/searchdoc', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        esClient.search(req.query.searchQuery).then(function (response) {
            res.write(JSON.stringify(response));
            res.end();
        });
    });

    app.get('/createdoc', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        esClient.delete(req.query.newDoc).then(function (response) {
            res.write(JSON.stringify(response));
            res.end();
        });
    });

    app.get('/deletedoc', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        esClient.delete(req.query.delDoc).then(function (response) {
            res.write(JSON.stringify(response));
            res.end();
        });
    });

    app.get('/pinges', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        esClient.ping();
        res.write('mycontent', encoding = 'utf8');
        res.end();
    });

    app.get('*', function (req, res) {
        res.sendFile('index.html', {
            root: '/src/public/'
        });
    });

}
