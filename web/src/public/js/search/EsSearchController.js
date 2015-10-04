angular.module('esSearchApp').controller('esSearchController', ['$scope', 'esSearchService', function($scope, esSearchService) {


  $scope.search = function() {

    $scope.resultsArr = [];
    $scope.resultsArr = esSearchService.searchES($scope.queryTerm);

  };


}])
