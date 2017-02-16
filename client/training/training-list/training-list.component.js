/**
 * Created by Yasir on 1/19/2016.
 */
angular.module('socially').directive('trainingList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/training/training-list/training-list.html',
        controllerAs: 'trainingList',
        controller: function ($scope, $reactive, $modal) {
            $reactive(this).attach($scope);
            this.perPage = 5;
            this.page = 1;
            this.sort = {
                heading: 1
            };
            this.orderProperty = '1';
            this.searchText = '';

            this.helpers({
                trainings: () => {
                return Training.find({}, { sort : this.getReactively('sort') });
            },
            trainingCount: () => {
                return Counts.get('numberOfTraining');
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
                        limit: parseInt(this.perPage),
                        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                        sort: this.getReactively('sort')
                    },
                    this.getReactively('searchText')
                ]
            });

            this.removeTraining = (training) => {
                Training.remove({_id: training._id});
            };
            this.updateTraining = (training) => {
                Training.update({_id: training._id},{
                    $set: {                       
                        Public: training.Public
                    }
                }
                , (error) => {
                if (error) {
                    Bert.alert('Oops, unable to update the training...', 'warning');
                }
                else {Bert.alert('Update successfully..', 'info');}
                
                });
            };

            this.pageChanged = (newPage) => {
                this.page = newPage;
            };

            this.updateSort = () => {
                this.sort = {
                    heading: parseInt(this.orderProperty)
                }
            };
            this.getNewsCreator = function(news){
                if (!news) {
                    return '';
                }

                let owner = Meteor.users.findOne(news.owner);

                if (!owner) {
                    return 'nobody';
                }

                if (Meteor.userId() !== null && owner._id === Meteor.userId()) {
                    return 'me';
                }

                return owner;
            };

            this.openAddNewTrainingModal = function () {
                $modal.open({
                    animation: true,
                    template: '<add-new-training-modal></add-new-training-modal>'
                });
            }
        }
    }
});