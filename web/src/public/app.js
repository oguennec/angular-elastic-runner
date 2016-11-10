(function () {
    'use strict';

    var app = angular.module('app', [
        'ui.router',
        'ngPrettyJson',
        'elasticsearch',
        'angular-elastic-builder'
    ]);


    app.config(function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });


    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        //$urlRouterProvider.otherwise("/search");
        $stateProvider
            .state('search', {
                url: '/search',
                controller: 'esSearchCtrl',
                controllerAs: 'simpleS',
                templateUrl: 'app/searchbox/searchOutcome.html'
            })
            .state('search.succeeded', {
                //url: '/succeeded',
                templateUrl: 'app/searchbox/showResults.html'
            })
            .state('search.failed', {
                //url: '/failed',
                templateUrl: 'app/searchbox/showError.html'
            })
            .state('querybuilder', {
                url: '/querybuilder',
                controller: 'queryBuilderCtrl',
                controllerAs: 'queryB',
                templateUrl: 'app/querybuilder/queryBuilder.html',
                params: {
                    queryObject: {
                        queryId: 1
                    }
                },
                resolve: {
                    'builderQuery': function ($stateParams, $http, esSearchSvc) {
                        return esSearchSvc.termQueryByKV('openrecipes', 'query', 'queryObject.queryId', $stateParams.queryObject.queryId);
                    }
                }
            })
            .state('querybuilder.show-query', {
                //url: '/query',
                views: {
                    'builderOutcome': {
                        templateUrl: 'app/querybuilder/showQuery.html'
                    }
                }
            })
            .state('querybuilder.run-query', {
                //url: '/searchEs',
                views: {
                    'builderOutcome': {
                        templateUrl: 'app/querybuilder/showResults.html'
                    }
                }
            })
            .state('querybuilder.run-failed', {
                //url: '/searchEs',
                views: {
                    'builderOutcome': {
                        templateUrl: 'app/querybuilder/showError.html'
                    }
                }
            })
            .state('listqueries', {
                url: '/listqueries',
                controller: 'listQueriesCtrl',
                controllerAs: 'listQ',
                templateUrl: 'app/querylist/listQueries.html',
                resolve: {
                    'listQueries': function ($stateParams, esSearchSvc, $http) {
                        return esSearchSvc.queryMatchAllDesc('openrecipes', 'query');
                    }
                }
            })
            .state('listqueries.show-query', {
                //url: '/show-query',
                controller: 'listQueriesCtrl',
                controllerAs: 'listQ',
                views: {
                    'listQuery': {
                        templateUrl: 'app/querylist/showQuery.html'
                    }
                }
            })
            .state('listqueries.run-query', {
                //url: '/run-query',
                views: {
                    'listQuery': {
                        templateUrl: 'app/querylist/showResults.html'
                    }
                }
            })
            .state('listqueries.failed', {
                url: '/run-query-failed',
                views: {
                    'listQuery': {
                        templateUrl: 'app/querylist/showError.html'
                    }
                }
            })
    }]);

    /*    app.run(['$state', 'stateWatcherService', function ($state, stateWatcherService) {}]);*/

    app.run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
      }
    ])

})();
