(function () {
    'use strict';

    angular.module('app').factory('elasticCluster', ['$location', '$state', 'esFactory', function ($location, $state, esFactory) {

/*        console.log($location.$$host);*/

        var esEndpointLocation = 'es:9200';

        var esClient = esFactory({
            host: esEndpointLocation
                //   ,log: 'trace'
        });

        return {
            esClient: esClient
        };
}]);

})()
