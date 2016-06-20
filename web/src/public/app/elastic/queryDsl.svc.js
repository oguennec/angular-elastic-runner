(function () {
    'use strict';

    angular.module('app').factory('queryDslSvc', ['$location', '$state', 'elasticCluster', queryDslSvc]);

    // Elastic 1.7 but Filtered Query deprecated in Elastic 2
    function queryDslSvc($location, $state, elasticCluster) {

        var buildFilteredQueryFromFilter = function (pFilter) {
            var filteredQuery = {
                "query": {
                    "filtered": {
                        query: {
                            "match_all": {}
                        },
                        "filter": pFilter
/*                                                "filter": {
                                                    "and": pFilter
                                                }*/
                    }
                }
            };
            return filteredQuery
        };

        // Elastic 2.3 and how compared to other Full Text queries and Term level queries
        /*      var buildFQueryFilterFromFilter = function () {
                  var filteredQuery = {
                      "query": {
                          "bool": {
                              must: {
                                  "match_all": {}
                              },
                              "filter": {
                                  "and": vm.elasticBuilderData.query
                              }
                          }
                      }
                  };
                  return filteredQuery
              };


            Remember how I was planning to use these ...
               var getFilterFromFilteredQuery = function () {};
               var getFilterFromQueryFilterContext = function () {

               };*/

        return {
            buildFilteredQueryFromFilter: buildFilteredQueryFromFilter
        }
    }

}());
