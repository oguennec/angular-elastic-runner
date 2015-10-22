(function () {
    'use strict';

    var app = angular.module('app', [
        'ngRoute',
        'ngPrettyJson',
        'elasticsearch'
    ]);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'esSearchCtrl',
                templateUrl: 'app/search/esSearch.html'
            })
    }]);


    app.run(['$route', function ($route) {
        // Include $route to kick start the router.
    }]);

})();