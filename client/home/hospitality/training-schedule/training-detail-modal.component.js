/**
 * Created by Yasir on 1/16/2016.
 */
angular.module('socially').directive('trainingDetailModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/home/hospitality/training-schedule/training-detail-modal.html',
        controllerAs: 'trainingDetailModal',
        controller: function ($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);

            this.subscribe('training');
            this.subscribe('users');

            this.helpers({
                    training: () => {
                    return Training.findOne({_id: Session.get('trainingId')});
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            currentUserId: () => {
                return Meteor.userId();
            }
            });
            this.close=()=>{
                $scope.$close();
                delete Session.keys.trainingId;
            };

        }
    }
});