(function () {
    'use strict';

    var app = angular.module('app', [
        'ui.router',
        'ngPrettyJson',
        'elasticsearch'
    ]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('search', {
                url: '/search',
                controller: 'esSearchCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/search/esSearch.html'
            })
    }]);

})();