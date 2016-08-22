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
                        "term": {}
                    }
                }
            };
            searchQuery.body.query.term[pField] = pValue;

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
