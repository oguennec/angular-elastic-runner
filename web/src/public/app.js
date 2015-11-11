(function () {
    'use strict';

    var app = angular.module('app', [
        'ui.router',
        'ngPrettyJson',
        'elasticsearch',
        'angular-elastic-builder'
    ]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/search");
        $stateProvider
            .state('search', {
                url: '/search',
                controller: 'esSearchCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/search/showResults.html'
            })
            .state('search-failed', {
                templateUrl: 'app/search/esAccessError.html'
            })
            .state('querybuilder', {
                url: '/querybuilder',
                controller: 'QueryBuilder',
                controllerAs: 'vm',
                templateUrl: 'app/querybuilder/queryBuilder.html'
            })
            .state('querybuilder.showquery', {
                //url: '/query',
                views: {
                    'builderOutcome': {
                        templateUrl: 'app/query/showQuery.html'
                    }
                },
                data: {
                    bodyClass: 'bg-query'
                }
            })
            .state('querybuilder.runquery', {
                //url: '/searchEs',
                views: {
                    'builderOutcome': {
                        templateUrl: 'app/search/showResults.html'
                    }
                },
                data: {
                    bodyClass: 'bg-results'
                }
            })
            .state('querybuilder.search-' +
            'failed', {
                url: '/error',
                views: {
                    'builderOutcome': {
                        templateUrl: 'app/search/esAccessError.html'
                    }
                }
            })
    }]);

})();