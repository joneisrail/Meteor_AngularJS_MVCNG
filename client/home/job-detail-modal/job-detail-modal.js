angular.module('socially').directive('jobDetailModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/home/job-detail-modal/job-detail-modal.html',
        controllerAs: 'jobDetailModal',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);
            this.subscribe('jobs');
            this.subscribe('users');
            this.subscribe('jobSeeker');
            this.subscribe('employer');

            this.helpers({
                    job: () => {                        
                    return  Jobs.findOne({_id:Session.get('jobId')});
            },
            employers: () => {
                return Employers.findOne({owner: this.job.owner});
            },  
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            }
            });
            
            this.close=()=>{
                $scope.$close();
                delete Session.keys.jobId;
            };
            
            this.apply = () => {
            let usr=Meteor.userId();
            let jobSeeker=JobSeeker.findOne({owner:usr});
            if(jobSeeker == null){return  Bert.alert('User profile not found!','warning');}

                Meteor.call('jobApply',this.job.cvMail,this.job.jobTitle, jobSeeker, (error) => {
                    if (error) {
                        Bert.alert('Oops, unable to apply this job!','warning');
                    }
                    else {
                         $scope.$close();
                         Bert.alert('Job apply successfully..', 'info');
                        }
                });
            };  
        }
    }
});