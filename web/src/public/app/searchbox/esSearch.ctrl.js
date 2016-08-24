(function () {
    'use strict';

    angular.module("app")
        .controller("esSearchCtrl", ["$state", "$scope", "$http", "esSearchSvc", esSearchCtrl]);

    function esSearchCtrl($state, $scope, $http, esSearchSvc) {

        var vm = this;

        vm.queryTerm = '';

        vm.recipes = [];

        var callEsSearchSvc = function () {

            var terms = $scope.$parent.vm.queryTerm;

            esSearchSvc.queryMatchAllTerms('openrecipes', 'recipe', terms)

            .then(function (response) {
                    var results = [];
                    if (response.data[0].length > 0) {
                        vm.recipes = response.data;
                        $state.go('search.succeeded');
                    };
                })
                .catch(function (data, status, headers, config) {
                    $state.go('search.failed');
                });
        };

        $scope.$on('PleaseQueryES', function () {
            callEsSearchSvc();
        });

    };

})();
