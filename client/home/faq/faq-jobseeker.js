/**
 * Created by Yasir on 1/24/2016.
 */
angular.module('socially').directive('faqjobseeker', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/home/faq/faq-jobseeker.html',
        controllerAs: 'faqjobseeker',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);         
           
        }
    }
});