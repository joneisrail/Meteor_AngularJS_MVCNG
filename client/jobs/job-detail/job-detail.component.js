angular.module('socially').directive('jobDetail', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/jobs/job-detail/job-detail.html',
        controllerAs: 'jobDetail',
        controller: function ($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);          
           
            this.subscribe('job');             
            this.subscribe('users');
            
            this.helpers({
                    jobD: () => {
                    return Jobs.findOne({_id: $stateParams.jobId});
            },
            ids: () =>{
                return $stateParams.jobId;
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

         this.save = () => {
                Jobs.update({_id: $stateParams.jobId}, {
                    $set: {
                        companyName:this.jobD.companyName,
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