(function () {
    'use strict';

    angular.module("app")
        .controller("QueryBuilder", ["$state", "esSearchSvc", QueryBuilder]);

    function QueryBuilder($state, esSearchSvc) {

        var vm = this;
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
            'ingredients': {type: 'term'},
            'description': {type: 'term'},
            'name': {type: 'term'},
            'recipeYield': {type: 'term'}
        };

        vm.elasticBuilderData.query = [];

        /*        vm.elasticBuilderData.query = [
         {
         "filtered": {
         "query": {
         "match": {"_all": "kale"}
         },
         "filter": {
         "range": {
         "datePublished": {
         "gte": "2013-02-10",
         "lte": "2013-03-29"
         }
         }
         }
         }
         }
         ];*/

        vm.elasticBuilderData.needsUpdate = true;

        vm.esBuildQuery = function () {
            var esQuery =
            {
                "query": {
                    "filtered": {
                        "query": {
                            "match_all": {}
                        },
                        "filter": {
                            and: vm.elasticBuilderData.query
                        }
                    }
                }
            };
            return esQuery;
        };

        vm.showEsQuery = function () {
            var esQuery =
            {
                "query": {
                    "filtered": {
                        "query": {
                            "match_all": {}
                        },
                        "filter": {
                            and: vm.elasticBuilderData.query
                        }
                    }
                }
            };
            vm.esQueryStringified = JSON.stringify(esQuery, null, 2);
        };


        var callEsSearchSvc = function (esQuery) {
            esSearchSvc.esClient.search({
                index: 'openrecipes',
                type: 'recipe',
                body: esQuery
            })
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
                }/*, function (err) {
                    console.trace('ES error message:'+err);
                    //console.trace('ES error message:'+err.message);
                    vm.errorMessage = err.message;
                    $state.go('querybuilder.run-failed');
                }*/)
                .catch(function(err){
                    vm.errorMessage = err.message;
                    console.trace(err.message);
                    $state.go('querybuilder.run-failed');
                });
        };


        vm.submitEsQuery = function () {
            callEsSearchSvc(vm.esBuildQuery());
        };

    }
})();
