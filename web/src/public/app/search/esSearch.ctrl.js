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
            vm.resultsArr = esSearchSvc.searchES($scope.$parent.vm.queryTerm);
            $state.go('search.succeeded');
            console.log($scope.$parent.vm.queryTerm);
            console.log($state.current);
            /*            /!* jshint -W116 *!/
             if($scope.$parent.vm.queryTerm != null) {
             /!* jshint +W116 *!/*/
            //if ($scope.$parent.vm.queryTerm == '') {
/*            if (vm.resultsArr == []) {
                $state.go('search');
            } else {
                $state.go('search.succeeded');
            }
            console.log($scope.$parent.vm.queryTerm);
            console.log($state.current);*/
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
