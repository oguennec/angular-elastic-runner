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




        var defaultQquery = [
        {
          "and": [
            {
              "and": [
                {
                  "terms": {
                    "source": [
                      "bonappetit",
                      "bbcfood"
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
      ];

/*        var defaultQquery = [
            {
                "and": [
                    {
                        "term": {
                            "name": "lentils"
                        }
                    },
                    {
                        "term": {
                            "name": "wine"
                        }
                    },
                    {
                        "term": {
                            "name": "ham"
                        }
                    },
                    {
                        "term": {
                            "name": "serrano"
                        }
                    }]
            }];*/

        if (builderQuery.hits.hits.length === 0) {
/*          console.log('defaultQuery', defaultQquery);
            console.log('builderQuery.hits.hits.length', builderQuery.hits.hits.length);*/
            vm.elasticBuilderData.query = defaultQquery;
        } else {
/*          console.log('builderQuery.hits.hits.length', builderQuery.hits.hits.length);*/
            vm.elasticBuilderData.query = builderQuery.hits.hits[0]._source.queryObject.queryFilter;
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
                    var hits_in;
                    var hits_out = [];
                    var results = [];

                    hits_in = (response.hits || {}).hits || [];

                    for (var ii = 0; ii < hits_in.length; ii++) {
                        hits_out.push(hits_in[ii]._source);
                    }

                    results.push(hits_out);
                    vm.resultsArr = results;
                    $state.go('querybuilder.run-query');
                })
                .catch(function (err) {
                    /*                    console.trace(err.message);
                                        vm.errorMessage = err.message;*/
                    console.trace(err);
                    vm.errorMessage = err;
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
                    var queryId = response.aggregations.max_id.value + 1;
                    console.log(queryId);

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
