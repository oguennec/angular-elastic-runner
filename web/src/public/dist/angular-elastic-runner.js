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

})();

(function () {
    'use strict';

    angular.module('app').factory('esModifySvc', ['$location', '$state', '$http', 'elasticCluster', esModifySvc]);

    function esModifySvc($location, $state, $http, elasticCluster) {

        function createDoc(pIndex, pType, pDoc) {
            var newDoc = {
                index: pIndex,
                type: pType,
                body: pDoc
            };

            var parameters = {
                newDoc: newDoc
            };

            var config = {
                params: parameters
            };

            var createdoc_response = $http.get('/createdoc', config);

            return createdoc_response
        }

        function deleteDoc(pIndex, pType, pDocId) {
            var delDoc = {
                index: pIndex,
                type: pType,
                id: pDocId
            };

            var parameters = {
                delDoc: delDoc
            };

            var config = {
                params: parameters
            };

            var deletedoc_response = $http.get('/deletedoc', config);

            return deletedoc_response
        }

        return {
            createDoc: createDoc,
            deleteDoc: deleteDoc
        }

    }

}());

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

(function () {
    'use strict';

    angular.module('app').factory('esSearchSvc', ['$location', '$state', '$http', 'elasticCluster', esSearchSvc]);

    function esSearchSvc($location, $state, $http, elasticCluster) {

        function queryMatchAllTerms(pIndex, pType, pTerms) {

            var searchQuery = {
                index: pIndex,
                type: pType,
                body: {
                    "query": {
                        "match": {
                            _all: pTerms
                        }
                    }
                }
            };

            var parameters = {
                searchQuery: searchQuery
            };

            var config = {
                params: parameters
            };

            var searchdoc_response = $http.get('/searchdoc_source', config);

            return searchdoc_response
        }

        function queryMatchAllDesc(pIndex, pType) {
            var searchQuery = {
                index: pIndex,
                type: pType,
                body: {
                    "query": {
                        "match_all": {}
                    },
                    "sort": {
                        "_id": "desc"
                    }
                }
            };

            var parameters = {
                searchQuery: searchQuery
            };

            var config = {
                params: parameters
            };

            var searchdoc_response = $http.get('/searchdoc', config);

            return searchdoc_response
        }

        function anyQuery(pIndex, pType, pQuery) {
            var searchQuery = {
                index: pIndex,
                type: pType,
                body: pQuery,
                //q: "_id:AVQzKStRyHo9UzWx8_58"
            };

            var parameters = {
                searchQuery: searchQuery
            };

            var config = {
                params: parameters
            };

            var searchdoc_response = $http.get('/searchdoc_source', config);

            return searchdoc_response
        }

        function fieldMaxValue(pIndex, pType, pField) {
            var searchQuery = {
                index: pIndex,
                type: pType,
                body: {
                    "aggs": {
                        "max_id": {
                            "max": {
                                "field": pField
                            }
                        }
                    },
                    "size": 0
                }
            };

            var parameters = {
                searchQuery: searchQuery
            };

            var config = {
                params: parameters
            };

            var searchdoc_response = $http.get('/searchdoc', config);

            return searchdoc_response
        }

        function termQueryByKV(pIndex, pType, pField, pValue) {
            var searchQuery = {
                index: pIndex,
                type: pType,
                body: {
                    "query": {
                        "bool": {
                            "must": [
                                {
                                    "match": {}
                                }
                            ]
                        }
                    }
                }
            };

            searchQuery.body.query.bool.must[0].match[pField] = pValue;

            var parameters = {
                searchQuery: searchQuery
            };

            var config = {
                params: parameters
            };

            var searchdoc_response = $http.get('/searchdoc', config);

            return searchdoc_response
        }

        return {
            queryMatchAllTerms: queryMatchAllTerms,
            queryMatchAllDesc: queryMatchAllDesc,
            anyQuery: anyQuery,
            fieldMaxValue: fieldMaxValue,
            termQueryByKV: termQueryByKV
        }
    }
}());
(function () {
    'use strict';

    angular.module("app")
        .controller("queryBuilderCtrl", ["$state", "$stateParams", "esSearchSvc", "esModifySvc", "builderQuery", "queryDslSvc", QueryBuilder]);

    function QueryBuilder($state, $stateParams, esSearchSvc, esModifySvc, builderQuery, queryDslSvc) {

        var vm = this;

        vm.isWrapperToggled = true;

        vm.elasticBuilderData = {};

        /**
         * The elasticBuilderData object will be modified in place so that you can use
         * your own $watch, and/or your own saving mechanism
         */

        /**
         * This object is the lookup for what fields
         * are available in your database, as well as definitions of what kind
         * of data they are
         */

        vm.elasticBuilderData.fields = {
            'ingredients': {
                type: 'term'
            },
            'description': {
                type: 'term'
            },
            'name': {
                type: 'term'
            },
            'recipeYield': {
                type: 'term'
            },
            'datePublished': {
                type: 'date'
            },
            'source': {
                type: 'multi',
                choices: ['bbcfood', 'aspicyperspective', 'bonappetit', 'chow', '101cookbooks', 'delishhh', 'naturallyella', 'thevintagemixer', 'thepioneerwoman']
            }
        };

        /*             var defaultQuery = [
                 {
                     "and": [
                         {
                             "and": [
                                 {
                                     "terms": {
                                         "source": [
                           "bbcfood",
                           "bonappetit"
                         ]
                                     }
                     },
                                 {
                                     "range": {
                                         "datePublished": {
                                             "lte": "2013-02-01",
                                             "format": "yyyy-MM-dd"
                                         }
                                     }
                     }
                   ]
                 },
                         {
                             "term": {
                                 "name": "chickpea"
                             }
                 }
               ]
             }
           ];*/

        var defaultQuery = [
            {
                "terms": {
                    "source": [
              "bbcfood",
              "bonappetit"
            ]
                }
        },
            {
                "range": {
                    "datePublished": {
                        "lte": "2013-02-01",
                        "format": "yyyy-MM-dd"
                    }
                }
        },
            {
                "term": {
                    "name": "chickpea"
                }
        }
      ];

        if (builderQuery.data.hits.hits.length === 0) {
            vm.elasticBuilderData.query = defaultQuery;
        } else {
            vm.elasticBuilderData.query = builderQuery.data.hits.hits[0]._source.queryObject.queryFilter;
        };

        vm.elasticBuilderData.needsUpdate = true;

        var stringifyObject = function (object) {
            var jsonString = JSON.stringify(object, null, 2);
            return jsonString
        }

        vm.showFilteredQuery = function () {
            vm.filteredQuery = queryDslSvc.buildFilteredQueryFromFilter(vm.elasticBuilderData.query);
            vm.esQueryStringified = stringifyObject(vm.filteredQuery);
        }


        var runQuery = function (esQuery) {
            esSearchSvc.anyQuery('openrecipes', 'recipe', esQuery)
                .then(function (response) {
                    var results = [];
                    results = response.data;
                    vm.resultsArr = results;
                    $state.go('querybuilder.run-query');
                })
                .catch(function (err) {
                    vm.errorMessage = 'querybuilder.run-failed'
                    $state.go('querybuilder.run-failed');
                });
        };

        vm.runFilteredQuery = function () {
            runQuery(queryDslSvc.buildFilteredQueryFromFilter(vm.elasticBuilderData.query));
        };

        var getMaxQueryId = function (field) {
            return esSearchSvc.fieldMaxValue('openrecipes', 'query', field)
        }

        vm.saveQuery = function () {

            //TO DO : disable save button ...;

            getMaxQueryId("queryObject.queryId").then(function (response) {
                    var queryId = response.data.aggregations.max_id.value + 1;
                    var queryObject = {
                        queryObject: {
                            queryId: queryId,
                            //users: { name : null, stars: null},
                            query: vm.filteredQuery,
                            queryFilter: vm.elasticBuilderData.query,
                            label: vm.queryLabel
                        }
                    };

                    esModifySvc.createDoc('openrecipes', 'query', stringifyObject(queryObject))
                        .then(function (response) {
                            console.log('Query saved succcessfully to ES!');
                        })
                        .catch(function (err) {
                            console.log('Failed to save query to ES!');
                            vm.errorMessage = err.message;
                            console.trace(err.message);
                        });
                })
                .catch(function (err) {
                    console.log('Failed to retrieve max queryObject.id from ES !');
                    console.trace(err.message);
                    return;
                })
                //TO DO :
                //.finally(){ enable save query function}

        };

        vm.isQLToggled = false;

    }
})();
(function () {
    'use strict';

    angular.module("app")
        .controller("listQueriesCtrl", ["$state", "$scope", "$http", "$window", "esSearchSvc", "esModifySvc", "listQueries", listQueriesCtrl]);

    function listQueriesCtrl($state, $scope, $http, $window, esSearchSvc, esModifySvc, listQueries) {
        var vm = this;

        var queryObjectList = [];
        var refreshlistQueries = function () {
            queryObjectList.length = 0;
            var queryListHits = listQueries.data.hits.hits;
            for (var ii = 0; ii < queryListHits.length; ii++) {
                queryObjectList.push(queryListHits[ii]);
            }
            return queryObjectList;
        }

        /* http://stackoverflow.com/questions/27768033/ui-router-nested-views-with-shared-controller
           http://plnkr.co/edit/Qy2Kg6iycaQh9PuEIbzJ?p=preview */
        $scope.vmShared = $scope.vmShared || {
            resultQueries: refreshlistQueries()
        };

        vm.isQueryDisplayed = true;

        vm.showQuery = function () {
            $state.go('listqueries.show-query');
        }

        vm.queryResultsArr = [];

        vm.runQuery = function (queryObject) {
            esSearchSvc.anyQuery('openrecipes', 'recipe', queryObject.query)
                .then(function (response) {
                    var results = [];
                    results = response.data;

                    var queryResults = {
                        answerSet: results,
                        queryLabel: queryObject.label
                    };
                    //replace VALUE of current KEY if exists ...
                    //search first index of element with same query label, will return -1 if doesnt exist ...
                    var idx = vm.queryResultsArr.map(function (e) {
                        return e.queryLabel
                    }).indexOf(queryResults.queryLabel);
                    if (idx === -1) {
                        vm.queryResultsArr.push(queryResults);
                    } else {
                        vm.queryResultsArr[idx] = queryResults;
                    };
                    $state.go('listqueries.run-query');
                })
                .catch(function (data, status, headers, config) {
                    vm.errorMessage = 'listqueries.failed'
                    $state.go('listqueries.failed');
                });

        };

        /*        vm.alert = function (msg) {
                    alert(msg);
                };*/

        vm.goToBuilder = function (queryObject) {
            $state.go('querybuilder', {
                queryObject: queryObject
            });
        };

        vm.deleteQuery = function (queryObject) {
            esModifySvc.deleteDoc('openrecipes', 'query', queryObject._id)
                .then(function (response) {
                    $scope.vmShared.resultQueries.splice($scope.vmShared.resultQueries.indexOf(queryObject), 1);
                    console.log('Query deleted succcessfully !');
                })
                .catch(function (err) {
                    console.log('Failed to delete query !');
                    vm.errorMessage = err.message;
                    console.trace(err.message);
                });
        };

    };

})();

(function () {
    'use strict';

    angular.module("app")
        .controller("showQueryCtrl", ["$state", "$scope", "$window", "esSearchSvc", "esModifySvc", "listQueries", showQueryCtrl]);

    function showQueryCtrl($state, $scope, $window, esSearchSvc, esModifySvc, listQueries) {

        var vm = this;
        /*      console.log('Inside showQueryCtrl');
                console.log('vm.resultQueries', vm.resultQueries);*/

    }

})();

(function () {
    'use strict';

    angular.module("app")
        .controller("esSearchCtrl", ["$state", "$scope", "$http", "esSearchSvc", esSearchCtrl]);

    function esSearchCtrl($state, $scope, $http, esSearchSvc) {

        var vm = this;

        vm.queryTerm = '';

        vm.recipes = [];

        var callEsSearchSvc = function () {

            var terms = $scope.$parent.vm.queryTerm;

            esSearchSvc.queryMatchAllTerms('openrecipes', 'recipe', terms)

            .then(function (response) {
                    var results = [];
                    if (response.data[0].length > 0) {
                        vm.recipes = response.data;
                        //console.log('vm.recipes', vm.recipes);
                        $state.go('search.succeeded');
                    };
                })
                .catch(function (data, status, headers, config) {
                    $state.go('search.failed');
                });
        };

        $scope.$on('PleaseQueryES', function () {
            callEsSearchSvc();
        });

    };

})();

(function () {
    'use strict';

    angular.module('app').factory('stateWatcherService', stateWatcherService);

    stateWatcherService.$inject = ['$rootScope'];

    function stateWatcherService($rootScope) {

        $rootScope.$on('$stateChangeStart', stateChangeStart);
        $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
        $rootScope.$on('$stateChangeError', stateChangeError);
        $rootScope.$on('$stateNotFound', stateNotFound);

        /*
                function stateChangeStart(event, toState, toParams, fromState, fromParams){
                    console.log('state change start', event, toState, toParams, fromState, fromParams);
                }

                function stateChangeSuccess(event, toState, toParams, fromState, fromParams){
                    console.log('state change success', event, toState, toParams, fromState, fromParams);
                }*/

        function stateChangeStart(event, toState, toParams, fromState, fromParams) {
            console.log('state change start', event, 'toState:', toState, 'toParams:', toParams, 'fromState:', fromState, 'fromParams:', fromParams);
        }

        function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
            console.log('state change success', event, 'toState:', toState, 'toParams:', toParams, 'fromState:', fromState, 'fromParams:', fromParams);
        }

        function stateChangeError(event, toState, toParams, fromState, fromParams, error) {
            console.log('state change error', event, toState, toParams, fromState, fromParams, error);
        }

        function stateNotFound(event, unfoundState, fromState, fromParams) {
            console.log('state not found', event, unfoundState, fromState, fromParams);
        }

        var service = {};
        return service;
    }
})();
