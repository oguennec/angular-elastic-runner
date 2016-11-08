//Create a client instance
var elasticsearch = require('elasticsearch');
var esEndpointIp = process.env.ES_1_PORT_9200_TCP_ADDR;
var esEndpointPort = process.env.ES_1_PORT_9200_TCP_PORT;
var esEndpointLocation = esEndpointIp + ':' + esEndpointPort;

if (esEndpointIp == null) {
    console.log('Following docker env variable not available within NodeJS : ES_1_PORT_9200_TCP_ADDR');
    console.log('process.env.ES_1_PORT_9208_TCP_ADDR ', process.env.ES_1_PORT_9200_TCP_ADDR);
    console.log('esEndpointLocation', esEndpointLocation);
} else {
    console.log('esEndpointLocation', esEndpointLocation);
}

var esClient = new elasticsearch.Client({
    host: esEndpointLocation
        //,log: 'trace'
});

module.exports.search = function (req) {

    var data = [
        {
            "_sourceRecipe1": {
                "recipeYield": "",
                "totalTime": "PT1HPT1H",
                "name": "Homemade Frozen Bean and Veggie BurritosHomemade Frozen Bean and Cheese Burritos",
                "ingredients": ["1 sweet potato", "2 tablespoon olive oil, divided", "1/2 teaspoon cumin", "salt and pepper", "3/4 cup corn", "3/4 cup frozen spinach", "1 can of black beans, rinsed and drained", "1/2 jar of salsa (6 ounce jar)", "4-6 ounces of Pepper Jack cheese", "1 package of whole wheat tortillas (10)", "2 cans refried beans", "1/2 teaspoon cumin (optional)", "salt and pepper", "10 flour tortillas", "1 cup cheese, Cheddar or Pepper Jack", "1/2 jar of salsa (using a 6 ounce jar)"],
                "url": "http://www.thevintagemixer.com/2013/03/homemade-frozen-bean-and-veggie-burritos/",
                "image": "http://d6h7vs5ykbiug.cloudfront.net/wp-content/uploads/2013/03/Frozen-Bean-and-Veggie-Burritos-0.jpg",
                "ts": {
                    "$date": 1365276038444
                },
                "source": "thevintagemixer"
            }
    }, {
            "_sourceRecipe2": {
                "description": "Beautiful buttermilk muffins - berry-streaked with sugar-sparkled tops, big flavor, and buttermilk-tender texture.",
                "prepTime": "PT10M",
                "datePublished": "2013-03-12",
                "recipeYield": "Makes 1 - 1 1/2 dozen, depending on size.",
                "name": "Buttermilk Berry Muffins",
                "ingredients": ["1 1/4 cups / 5 1/2 oz / 160 g whole wheat pastry flour", "2 1/4 cups / 10 1/2 oz / 295 g unbleached all-purpose flour", "1/2 cup / 3 1/2 oz / 100 g firmly packed brown sugar", "3/4 teaspoon fine grain sea salt", "1/2 teaspoon baking soda", "2 teaspoons baking powder", "5 1/2 oz mashed, ripe banana (~2 med.)", "240 ml buttermilk", "3 large eggs", "1 teaspoon vanilla extract", "1/2 cup / 4 oz / 115 g unsalted butter, barely melted", "1 cup / 4.5 oz / 125 g berries, plus more for topping", "rose cinnamon sugar*"],
                "url": "http://www.101cookbooks.com/archives/buttermilk-berry-muffins-recipe.html",
                "image": "http://www.101cookbooks.com/mt-static/images/food/buttermilk_berry_muffin_recipe.jpg",
                "ts": {
                    "$date": 1365276039536
                },
                "cookTime": "PT30M",
                "source": "101cookbooks"
            }
    }, {
            "_sourceRecipe3": {
                "description": "Happy Valentines Day!  I am not a big Valentine's person, i believe we should celebrate love everyday.  However, on Valentine's day i like to give a few cards out, and share a cocktail or two with the loved ones.  White Russian's are some of my favorite dessert drinks!  Have you tried to flavor it with International Delight?  Sooo good!…",
                "prepTime": "PT5M",
                "dateModified": "2013-03-24T04:42:49+00:00",
                "recipeYield": "serves 1",
                "name": "White Russian Cocktail",
                "ingredients": ["2 oz vodka", "1 1/4 oz Kahlua", "1 1/4 oz International Delight French Vanilla Creamer (or you can use milk or half and half)"],
                "url": "http://delishhh.com/2013/02/14/white-russian-cocktail/",
                "image": "http://delishhh.com/wp-content/uploads/2013/02/IMG_5437_small_txt.jpg",
                "ts": {
                    "$date": 1365276040793
                },
                "datePublished": "2013-02-14T21:26:19+00:00",
                "source": "delishhihh"
            }
    }];

    return esClient.search(JSON.parse(req));

}

module.exports.create = function (req) {
    return esClient.create(JSON.parse(req));
}

module.exports.delete = function (req) {
    return esClient.delete(JSON.parse(req));
}

module.exports.ping = function () {
    //Send a HEAD request to /?hello=elasticsearch and allow up to 1 second for it to complete.
    esClient.ping({
        // ping usually has a 3000ms timeout
        requestTimeout: Infinity,

        // undocumented params are appended to the query string
        hello: "elasticsearch!"
    }, function (error) {
        if (error) {
            console.trace('elasticsearch cluster is down!');
        } else {
            return ('All is well');
            console.log('All is well');
        }
    });

}