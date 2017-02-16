angular.module('socially').directive('jobEdit', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/jobs/job-edit/job-edit.html',
        controllerAs: 'jobEdit',
        controller: function ($scope, $stateParams, $reactive, $filter) {
            $reactive(this).attach($scope);

            this.subscribe('job');
            this.subscribe('users');
            this.subscribe('images');

            this.helpers({
                    job: () => {
                    return Jobs.findOne({_id: $stateParams.jobId});
            },
            users: () => {
                return Meteor.users.find({});
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            currentUserId: () => {
                return Meteor.userId();
            },
            images: () => {
              return Images.find({});
            }
            });
            this.save = () => {
                Jobs.update({_id: $stateParams.jobId}, {
                    $set: {
                        jobTitle: this.jobD.jobTitle,
                        jobDescription:this.jobD.jobDescription,
                        noOfVacancies:this.jobD.noOfVacancies,
                        education:this.jobD.education,
                        experience:this.jobD.experience,
                        jobLevel:this.jobD.jobLevel,
                        jobType:this.jobD.jobType,
                        jobLocation:this.jobD.jobLocation,
                        benefit:this.jobD.benefit,
                        salary:this.jobD.salary,
                        deadline:this.jobD.deadline,
                        cvMail:this.jobD.cvMail,
                        jobCategory:this.jobD.jobCategory
                    }
                }, (error) => {
                    if (error) {
                        Bert.alert('Oops, unable to update the jobs...','warning');
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