(function () {
    'use strict';

    angular.module("app")
        .controller("esSearchCtrl",
        ["$scope", "esSearchSvc", esSearchCtrl]);

    function esSearchCtrl($scope, esSearchSvc) {

        var vm = this;

        vm.queryTerm = '';

        vm.pleaseQueryES = function(){
          console.log('vm.queryTerm: '+vm.queryTerm);
        };

        $scope.$on('PleaseQueryES', function() {
            vm.resultsArr = esSearchSvc.searchES($scope.$parent.vm.queryTerm);
        });

/*        $scope.$parent.$watch(function () {
                return $scope.$parent.vm.queryTerm;
                /!*                if (!$scope.$parent.vm.queryTerm) {
                 return
                 } else {
                 return $scope.$parent.vm.queryTerm;
                 }*!/
            }, function (newVal, oldVal) {
                if (!newVal) {
                    return
                } else {
                    vm.resultsArr = esSearchSvc.searchES(newVal);
                }
            }
        );*/

    };

})();
