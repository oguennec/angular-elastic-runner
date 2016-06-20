(function () {
    'use strict';

    angular.module("app")
        .controller("listQueriesCtrl", ["$state", "$scope", "$window", "esSearchSvc", "esModifySvc", "listQueries", listQueriesCtrl]);

    function listQueriesCtrl($state, $scope, $window, esSearchSvc, esModifySvc, listQueries) {
        var vm = this;

        var queryObjectList = [];
        var refreshlistQueries = function () {
            queryObjectList.length = 0;
            var queryListHits = listQueries.hits.hits;
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
                    var hits_in;
                    var hits_out = [];
                    var results = [];
                    hits_in = (response.hits || {}).hits || [];
                    for (var ii = 0; ii < hits_in.length; ii++) {
                        hits_out.push(hits_in[ii]._source);
                    }
                    results.push(hits_out);
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
                .catch(function (err) {
                    console.trace(err);
                    vm.errorMessage = err;
                    $state.go('listqueries.failed');
                });
        };

        /*        vm.alert = function (msg) {
                    alert(msg);
                };*/

        vm.goToBuilder = function (queryObject) {
            $state.go('querybuilder', {
                queryId: queryObject.queryId
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
