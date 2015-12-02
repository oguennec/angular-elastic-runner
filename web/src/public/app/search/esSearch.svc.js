angular.module('app').factory('esSearchSvc', ['$location', '$state', 'esFactory', function ($location, $state, esFactory) {

    console.log($location.$$host);

    var esEndpointLocation = $location.$$host+':9200';

    var esClient = esFactory({
        host: esEndpointLocation
//   ,log: 'trace'
    });

    return {
        esClient: esClient,
        simpleSearch: function (ingredient){
                    var recipesData = {

                           "description": "Smoked paprika gives some heat to this earthy tahini salad dressing.",
                           "recipeYield": "Makes 1 1/2 cups",
                           "name": "Smoky Lemon Tahini Dressing",
                           "ingredients": "1 garlic clove, grated\n1/2 tahini (sesame seed paste)\n1/4 fresh lemon juice\n3/4 kosher salt\n1/8 smoked paprika",
                           "url": "http://www.bonappetit.com/recipes/2013/01/smoky-lemon-tahini-dressing",
                           "image": "http://subscribe.condenet.com/images_covers/cover_bonap_135.jpg?fbrefresh=20130406",
                           "ts": {
                              "$date": 1365276179704
                           },
                           "datePublished": "2013-01-01",
                           "source": "bonappetit"

                    };
                   return recipesData;
        }
    };
}]);
