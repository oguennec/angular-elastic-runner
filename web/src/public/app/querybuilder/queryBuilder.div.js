 angular.module("app").directive("hideSidebar", function () {
        return {
            restrict: 'AE',
            replace: 'true',
            //transclude: true,
            scope: {
                'onClick': '&wrapperToggleFunction'

            },
            link: function (scope, element) {
                element.bind("click", function (e) {
                    console.log('hideSidebar directive was hit');
                    console.log('element clicked: ', element[0]);
                    $("#wrapper").toggleClass("toggled");
                });
            }
        };
    });
