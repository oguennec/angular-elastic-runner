(function () {
    'use strict';

    angular.module("app")
        .controller("esSearchCtrl",
        ["$state", "$scope", "esSearchSvc", esSearchCtrl]);

    function esSearchCtrl($state, $scope, esSearchSvc) {

        var vm = this;

        vm.queryTerm = '';

        vm.pleaseQueryES = function(){
          console.log('vm.queryTerm: '+vm.queryTerm);
        };

        $scope.$on('PleaseQueryES', function() {
            //vm.resultsArr = esSearchSvc.searchES($scope.$parent.vm.queryTerm);
            esSearchSvc.searchES($scope.$parent.vm.queryTerm).then(esSearchSuccess,esSearchError);
            function esSearchSuccess (results){
                vm.resultsArr = results;
            }
            function esSearchError (reason){
                console.trace(reason);
                $state.go('search-failed');
                // display error message in ui-view
            }
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
