(function () {
    'use strict';

    angular.module("app")
        .controller("showQueryCtrl", ["$state", "$scope", "$window", "esSearchSvc", "esModifySvc", "listQueries", showQueryCtrl]);

    function showQueryCtrl($state, $scope, $window, esSearchSvc, esModifySvc, listQueries) {

        var vm = this;

        console.log('Inside showQueryCtrl');
        console.log('vm.resultQueries', vm.resultQueries);

    }

})();
