angular.module('app').factory('esSearchSvc', ['$q', 'esFactory', function ($q, esFactory) {

    var esClient = esFactory({
        host: 'es:9200'
//   ,log: 'trace'
    });

    var deferred = $q.defer();

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
                deferred.resolve(results);

            }, function (err) {
                //console.trace(err.message);
                deferred.reject('Call to Elastic Search has failed');
            });

        //return results;
        return deferred.promise;
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
                deferred.resolve(results);
            }, function (err) {
                deferred.reject('Call to Elastic Search has failed');
            });

        return deferred.promise;
    };


    return {
        searchES: esSearch,
        esQuerySubmit: esQuerySubmit
    };
}]);
