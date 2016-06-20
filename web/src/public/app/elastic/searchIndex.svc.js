(function () {
    'use strict';

    angular.module('app').factory('esSearchSvc', ['$location', '$state', 'elasticCluster', esSearchSvc]);

    function esSearchSvc($location, $state, elasticCluster) {

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
            return elasticCluster.esClient.search(searchQuery)
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
            return elasticCluster.esClient.search(searchQuery)
        }

        function anyQuery(pIndex, pType, pQuery) {
            var searchQuery = {
                index: pIndex,
                type: pType,
                body: pQuery,
                //q: "_id:AVQzKStRyHo9UzWx8_58"
            };
            return elasticCluster.esClient.search(searchQuery)
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
            return elasticCluster.esClient.search(searchQuery)
        }

        function termQueryByKV(pIndex, pType, pField, pValue) {
            var searchQuery = {
                index: pIndex,
                type: pType,
                body: {
                    "query": {
                        "term": {}
                    }
                }
            };
            searchQuery.body.query.term[pField] = pValue;
            return elasticCluster.esClient.search(searchQuery)
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
