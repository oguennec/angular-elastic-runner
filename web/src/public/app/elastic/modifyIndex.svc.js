(function () {
    'use strict';

    angular.module('app').factory('esModifySvc', ['$location', '$state', 'elasticCluster', esModifySvc]);

    function esModifySvc($location, $state, elasticCluster) {

        function createDoc(pIndex, pType, pDoc) {
            var newObject = {
                index: pIndex,
                type: pType,
                body: pDoc
            };
            return elasticCluster.esClient.create(newObject)
        }

        function deleteDoc(pIndex, pType, pDocId) {
            var delObj = {
                index: pIndex,
                type: pType,
                id: pDocId
            };
            return elasticCluster.esClient.delete(delObj)
        }

        return {
            createDoc: createDoc,
            deleteDoc: deleteDoc
        }

    }

}());
