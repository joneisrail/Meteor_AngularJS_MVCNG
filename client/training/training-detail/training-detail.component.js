/**
 * Created by Yasir on 1/19/2016.
 */
angular.module('socially').directive('trainingDetail', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/training/training-detail/training-detail.html',
        controllerAs: 'trainingDetail',
        controller: function ($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);

            this.subscribe('training');
            this.subscribe('users');

            this.helpers({
                    training: () => {
                    return Training.findOne({_id: $stateParams.trainingId});
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            currentUserId: () => {
                return Meteor.userId();
            }
        });



        this.trainingUpdate =() => {
            Training.update({_id: $stateParams.trainingId}, {
                $set: {
                    heading:this.training.heading,
                    date:this.training.date,
                    detail:this.training.detail,
                    summary:this.training.summary,
                    trainer:this.training.trainer
                   
                }
            }, (error) => {
                if (error) {
                    Bert.alert('Oops, unable to update the training...', 'warning');                    
                }
                else {
                    Bert.alert('Update successfully..', 'info');
            history.back()
        }
        });
        };


        }
    }
});