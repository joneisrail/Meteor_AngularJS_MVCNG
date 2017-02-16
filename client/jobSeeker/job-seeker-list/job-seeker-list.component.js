/**
 * Created by Yasir on 1/24/2016.
 */
angular.module('socially').directive('jobSeekerList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/jobSeeker/job-seeker-list/job-seeker-list.html',
        controllerAs: 'jobSeekerList',
        controller: function ($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);
            this.perPage = 50;
            this.page = 1;
            this.sort = {
                createdAt: -1
            };
            this.orderProperty = '1';
           
            this.searchText = '';
            this.subscribe('users');

            this.helpers({
                    jobSeekers: () => {
                    return JobSeeker.find({},{ sort : this.getReactively('sort') });
            },
            users: () => {
                return Meteor.users.find({});
            },
            jobSeekerCount: () => {
                return Counts.get('numberOfJobSeeker');
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            currentUserId: () => {
                return Meteor.userId();
            }
            });

            this.subscribe('jobSeeker', () => {
                return [
                    {
                        limit: parseInt(this.perPage),
                        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                        sort: this.getReactively('sort')
                    },
                    this.getReactively('searchText')
                ]
            });
            this.pageChanged = (newPage) => {
                this.page = newPage;
            };

            this.updateSort = () => {
                this.sort = {
                    createdAt: parseInt(this.orderProperty)
                }
            };
          

            var columns = [
                {title: "Name", key: "name"},
                {title: "NationalID", key: "nationaId"}, 
                {title: "Mobile", key: "mobile"}, 
                {title: "DOB", key: "dateOfBirth"},
                {title: "Email", key: "email"},
                {title: "Present Addrss", key: "presentAddrss"}
            ];
            
            this.downloadPdf = ()=> {                
                var doc = new jsPDF('p','pt');
                doc.autoTable(columns, this.jobSeekers);
                doc.save('JobSeekerList.pdf');
            };

        }
    }
});