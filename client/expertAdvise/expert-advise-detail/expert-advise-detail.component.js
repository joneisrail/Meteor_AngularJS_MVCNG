/**
 * Created by Yasir on 1/19/2016.
 */
angular.module('socially').directive('expertAdviseDetail', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/expertAdvise/expert-advise-detail/expert-advise-detail.html',
        controllerAs: 'expertAdviseDetail',
        controller: function ($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);

            this.subscribe('expertAdvise');
            this.subscribe('users');

            this.helpers({
                    expertAdvise: () => {
                    return ExpertAdvise.findOne({_id: $stateParams.expertAdviseId});
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            currentUserId: () => {
                return Meteor.userId();
            }
        });



        this.expertAdviseUpdate =() => {
            ExpertAdvise.update({_id: $stateParams.expertAdviseId}, {
                $set: {
                    heading:this.expertAdvise.heading,                    
                    detail:this.expertAdvise.detail,
                    summary:this.expertAdvise.summary,
                    url:this.expertAdvise.url,
                    imageUrl:this.expertAdvise.imageUrl,
                    expertDetail:this.expertAdvise.expertDetail                   
                }
            }, (error) => {
                if (error) {
                    Bert.alert('Oops, unable to update the expert sdvise...','warning');
                }
                else {
                    Bert.alert('Update successfully..', 'info');
                 history.back();
                }
            });
        };


        }
    }
});