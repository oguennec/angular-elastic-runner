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
