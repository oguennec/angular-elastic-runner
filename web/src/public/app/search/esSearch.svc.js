angular.module('app').factory('esSearchSvc', ['$state', 'esFactory', function ($state, esFactory) {

    var esClient = esFactory({
        host: 'es:9200'
//   ,log: 'trace'
    });

    return {
        esClient: esClient,
    };
}]);
