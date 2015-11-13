(function () {
    'use strict';

    angular.module("app")
        .controller("esSearchCtrl",
        ["$state", "$scope", "esSearchSvc", esSearchCtrl]);

    function esSearchCtrl($state, $scope, esSearchSvc) {

        var vm = this;

        vm.queryTerm = '';

        vm.pleaseQueryES = function () {
            console.log('vm.queryTerm: ' + vm.queryTerm);
        };

        $scope.$on('PleaseQueryES', function () {
            //console.log($scope.$parent.vm.queryTerm);
            vm.resultsArr = esSearchSvc.searchES($scope.$parent.vm.queryTerm);
            $state.go('search.succeeded');
        });

    };

})();
