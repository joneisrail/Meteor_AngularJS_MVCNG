/**
 * Created by Yasir on 1/16/2016.
 */
angular.module('socially').directive('addNewExpertAdviseModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/expertAdvise/add-new-expert-advise-modal/add-new-expert-advise-modal.html',
        controllerAs: 'addNewExpertAdviseModal',
        controller: function ($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);

            this.helpers({
                    isLoggedIn: () => {
                    return Meteor.userId() !== null;
                }
            });

            this.newExpertAdvise = {};

            this.addNewExpertAdvise = () => {
                this.newExpertAdvise.owner = Meteor.userId();
                this.newExpertAdvise.Public=false;
                ExpertAdvise.insert(this.newExpertAdvise);
                this.newExpertAdvise = {};
                $scope.$close();
            };
        }
    }
});