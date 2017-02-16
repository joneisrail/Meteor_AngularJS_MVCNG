/**
 * Created by Yasir on 1/19/2016.
 */
angular.module('socially').directive('trainingSchedule', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/home/hospitality/training-schedule/training-schedule.html',
        controllerAs: 'trainingSchedule',
        controller: function ($scope, $reactive, $modal) {
            $reactive(this).attach($scope);
            this.sort = {
                cratedAt: -1
            };
            this.orderProperty = '1';
            this.searchText = '';

            this.helpers({
                trainings: () => {
                return Training.find({Public:true}, { sort : this.getReactively('sort') });
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            currentUserId: () => {
                return Meteor.userId();
            }
        });

            this.subscribe('users');

            this.subscribe('training', () => {
                return [
                    {

                        sort: this.getReactively('sort')
                    },
                    this.getReactively('searchText')
                ]
            });


            this.updateSort = () => {
                this.sort = {
                    cratedAt: parseInt(this.orderProperty)
                }
            };
            this.getNewsCreator = function(training){
                if (!training) {
                    return '';
                }

                let owner = Meteor.users.findOne(training.owner);

                if (!owner) {
                    return 'nobody';
                }

                if (Meteor.userId() !== null && owner._id === Meteor.userId()) {
                    return 'me';
                }

                return owner;
            };

            this.openAddNewTrainingModal = function (trainingId) {
                Session.set('trainingId',trainingId),
                $modal.open({
                    animation: true,
                    template: '<training-detail-modal></training-detail-modal>'
                });
            }
        }
    }
});