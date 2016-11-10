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
