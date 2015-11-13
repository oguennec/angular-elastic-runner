(function () {
    'use strict';

    angular.module("app")
        .controller("esSearchCtrl",
        ["$state", "$scope", "esSearchSvc", esSearchCtrl]);

    function esSearchCtrl($state, $scope, esSearchSvc) {

        var vm = this;

        vm.queryTerm = '';

        // below var used as argument in esSearchSvcCall(esSearchBody)
        //var esSearchBody = 'body ...';

        var callEsSearchSvc = function () {
            esSearchSvc.esClient.search({
                index: 'openrecipes',
                type: 'recipe',
                body: {
                    "query": {
                        "match": {_all: $scope.$parent.vm.queryTerm}
                    }
                }
            })
                .then(function (response) {
                    var hits_in;
                    var hits_out = [];
                    var results = [];

                    hits_in = (response.hits || {}).hits || [];

                    for (var ii = 0; ii < hits_in.length; ii++) {
                        hits_out.push(hits_in[ii]._source);
                    }

                    results.push(hits_out);
                    vm.resultsArr = results;
                    $state.go('search.succeeded');
                }, function (err) {
                    console.trace(err.message);
                    $state.go('search.failed');
                });
        };

        $scope.$on('PleaseQueryES', function () {
            callEsSearchSvc();
        });

    };

})();
