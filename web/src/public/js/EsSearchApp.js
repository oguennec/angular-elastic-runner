var esSearchApp = angular.module('esSearchApp', [
    'ngRoute',
    'ngPrettyJson',
    'elasticsearch'
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                controller: 'esSearchController',
                templateUrl: 'views/EsSearch.html'
            })
    }]);

