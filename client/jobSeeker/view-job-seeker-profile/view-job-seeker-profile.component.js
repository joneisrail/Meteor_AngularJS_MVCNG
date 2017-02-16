
angular.module('socially').directive('jobSeekerProfile', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/jobSeeker/job-seeker/job-seeker-view.html',
        controllerAs: 'jobSeekerProfile',
        controller: function ($scope,$stateParams, $reactive,  $filter) {
            $reactive(this).attach($scope);

            this.subscribe('jobSeeker');
            this.subscribe('users');
            
            this.helpers({
                jobSeeker: () => {
                return JobSeeker.findOne(
                    {
                        $or: [ { _id: $stateParams.jobSeekerId},{ owner: Meteor.userId()} ]
                    });
            },
            users: () => {
                return Meteor.users.find({});
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            currentUserId: () => {
                return Meteor.userId();
            }
        });
        

        }
    }
});