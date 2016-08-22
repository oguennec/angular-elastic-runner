(function () {
    'use strict';

    angular.module('app').factory('elasticCluster', ['$location', '$state', 'esFactory', function ($location, $state, esFactory) {

        var esEndpointLocation = $location.$$host + ':9200';

        var esClient = esFactory({
            host: esEndpointLocation
                //   ,log: 'trace'
        });

        return {
            esClient: esClient
        };
}]);

})()
