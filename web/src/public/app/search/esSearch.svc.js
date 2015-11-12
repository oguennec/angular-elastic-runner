angular.module('app').factory('esSearchSvc', ['$state','esFactory', function ($state, esFactory) {

    var esClient = esFactory({
        host: 'es:9200'
//   ,log: 'trace'
    });

    var esSearch = function (searchTerm) {

        var results = [];
        esClient.search({
            index: 'openrecipes',
            type: 'recipe',
            body: {
                "query": {
                    "match": {_all: searchTerm}
                }

            }
        })
            .then(function (response) {
                var hits_in;
                var hits_out = [];

                hits_in = (response.hits || {}).hits || [];

                for (var ii = 0; ii < hits_in.length; ii++) {
                    hits_out.push(hits_in[ii]._source);
                }

                results.push(hits_out);
            }, function (err) {
                console.trace(err.message);
                $state.go('search.failed');
                console.log($state.current);
            });

        return results;

    };

    /*
     var esQuerySubmit = function (esQuery) {
     return null;
     };*/


    var esQuerySubmit = function (esQuery) {
        var results = [];
/*        esClient.search({
            index: 'openrecipes',
            type: 'recipe',
            body: {
                "query": {
                    "match": {_all: 'kale'}
                }
            }
        })*/
                    esClient.search({
             index: 'openrecipes',
             type: 'recipe',
             body: esQuery
             })
            .then(function (response) {
                var hits_in;
                var hits_out = [];

                hits_in = (response.hits || {}).hits || [];

                for (var ii = 0; ii < hits_in.length; ii++) {
                    hits_out.push(hits_in[ii]._source);
                }

                results.push(hits_out);
            }, function (err) {
                console.trace(err.message);
            });

        return results;
    };


    return {
        searchES: esSearch,
        esQuerySubmit: esQuerySubmit
    };
}]);
