(function () {
    'use strict';

    var app = angular.module('app', [
        'ui.router',
        'ngPrettyJson',
        'elasticsearch'
    ]);

    app.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise("/search");
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'esSearchCtrl',
                templateUrl: 'app/search/esSearch.html'
            })
    }]);


/*    app.run(['$route', function ($route) {
        // Include $route to kick start the router.
    }]);*/

})();