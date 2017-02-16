/**
 * Created by Yasir on 1/16/2016.
 */
angular.module('socially').directive('addNewJobModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/jobs/add-new-job-modal/add-new-job-modal.html',
        controllerAs: 'addNewJobModal',
        controller: function ($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);

            this.helpers({
                    isLoggedIn: () => {
                    return Meteor.userId() !== null;
        }
        });

            this.newJob = {};

            this.addNewJob = () => {
                this.newJob.owner = Meteor.userId();
                this.newJob.Public=false;
                this.newJob.createdAt= new Date();                
                Jobs.insert(this.newJob);
                this.newJob = {};
                $scope.$close();
            };
        }
    }
});