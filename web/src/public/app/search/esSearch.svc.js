angular.module('app').factory('esSearchSvc', ['$location', '$state', 'esFactory', function ($location, $state, esFactory) {

    console.log($location.$$host);

    var esEndpointLocation = $location.$$host+':9200';

    var esClient = esFactory({
        host: esEndpointLocation
//   ,log: 'trace'
    });

    return {
        esClient: esClient,
    };
}]);
