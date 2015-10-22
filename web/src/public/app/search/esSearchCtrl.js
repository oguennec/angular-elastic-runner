angular.module('app').controller('esSearchCtrl', ['$scope', 'esSearchSvc', function ($scope, esSearchSvc) {


    $scope.search = function () {

        $scope.resultsArr = [];
        $scope.resultsArr = esSearchSvc.searchES($scope.queryTerm);

    };


}])
