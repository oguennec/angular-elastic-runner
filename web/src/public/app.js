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
                templateUrl: 'app/search/searchOutcome.html'
            })
            .state('search.succeeded', {
                //url: '/succeeded',
                templateUrl: 'app/search/showResults.html'
            })
            .state('search.failed', {
                //url: '/failed',
                templateUrl: 'app/search/esAccessError.html'
            })
            .state('querybuilder', {
                url: '/querybuilder',
                controller: 'QueryBuilder',
                controllerAs: 'vm',
                templateUrl: 'app/querybuilder/queryBuilder.html'
            })
            .state('querybuilder.show-query', {
                //url: '/query',
                views: {
                    'builderOutcome': {
                        templateUrl: 'app/query/showQuery.html'
                    }
                }
            })
            .state('querybuilder.run-query', {
                //url: '/searchEs',
                views: {
                    'builderOutcome': {
                        templateUrl: 'app/search/showResults.html'
                    }
                }
            })
            .state('querybuilder.run-failed', {
                //url: '/searchEs',
                views: {
                    'builderOutcome': {
                        templateUrl: 'app/search/esAccessError.html'
                    }
                }
            })
    }]);

    app.run(['$state', 'stateWatcherService', function ($state, stateWatcherService) {
    }]);

})();