/**
 * Created by Yasir on 1/24/2016.
 */
angular.module('socially').directive('about', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/home/about/about-us.html',
        controllerAs: 'about',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);         
           
        }
    }
});