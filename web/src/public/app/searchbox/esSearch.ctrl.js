(function () {
    'use strict';

    angular.module("app")
        .controller("esSearchCtrl", ["$state", "$scope", "esSearchSvc", esSearchCtrl]);

    function esSearchCtrl($state, $scope, esSearchSvc) {

        var vm = this;

        vm.queryTerm = '';

        var callEsSearchSvc = function () {

            var terms = $scope.$parent.vm.queryTerm;

            esSearchSvc.queryMatchAllTerms('openrecipes', 'recipe', terms).then(function (response) {
                    var hits_in;
                    var hits_out = [];
                    var recipes = [];

                    hits_in = (response.hits || {}).hits || [];

                    for (var ii = 0; ii < hits_in.length; ii++) {
                        hits_out.push(hits_in[ii]._source);
                    }
                    recipes.push(hits_out);
                    vm.recipes = recipes;
                    $state.go('search.succeeded');
                })
                .catch(function (err) {
                    console.trace(err.message);
                    vm.errorMessage = err;
                    $state.go('search.failed');
                });

        };

        $scope.$on('PleaseQueryES', function () {
            callEsSearchSvc();
        });

    };

})();
