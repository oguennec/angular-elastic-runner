(function () {
    'use strict';

    angular.module("app")
        .controller("QueryBuilder", ["esSearchSvc", QueryBuilder]);

    function QueryBuilder(esSearchSvc) {

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

        vm.submitEsQuery = function () {
            var vm = this;
            vm.resultsArr = esSearchSvc.esQuerySubmit(vm.esBuildQuery());
        };

    }
})();
