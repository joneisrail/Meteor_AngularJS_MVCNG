/**
 * Created by Yasir on 1/16/2016.
 */
angular.module('socially').directive('addNewTrainingModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/training/add-new-trainig-modal/add-new-training-modal.html',
        controllerAs: 'addNewTrainingModal',
        controller: function ($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);

            this.helpers({
                    isLoggedIn: () => {
                    return Meteor.userId() !== null;
                }
            });

            this.newTraining = {};

            this.addNewTraining = () => {
                this.newTraining.owner = Meteor.userId();
                this.newTraining.Public=false;
                this.newTraining.createdAt= new Date();
                Training.insert(this.newTraining);
                this.newTraining = {};
                $scope.$close();
            };
        }
    }
});