(function () {
    'use strict';

    angular.module("app")
        .controller("esSearchCtrl",
        ["$scope", "esSearchSvc", esSearchCtrl]);

    function esSearchCtrl($scope, esSearchSvc) {

        var vm = this;

        vm.queryTerm = '';

        $scope.$parent.$watch(function () {
                if (!$scope.$parent.vm) {
                    return
                } else {
                    return $scope.$parent.vm.queryTerm;
                }
                ;
            }, function (newVal, oldVal) {
                if (!newVal) {
                    return
                } else {
                    vm.resultsArr = esSearchSvc.searchES(newVal);
                }
            }
        );

    };

})();
