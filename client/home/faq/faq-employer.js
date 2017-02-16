/**
 * Created by Yasir on 1/24/2016.
 */
angular.module('socially').directive('faqemployer', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/home/faq/faq-employer.html',
        controllerAs: 'faqemployer',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);         
           
        }
    }
});