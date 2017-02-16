/**
 * Created by Yasir on 1/24/2016.
 */
angular.module('socially').directive('employeeList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/Employer/employee-list/employee-list.html',
        controllerAs: 'employeeList',
        controller: function ($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);
            this.perPage = 5;
            this.page = 1;
            this.sort = {
                keyword: -1
            };
            this.orderProperty = '1';
            this.inputCat='';
            this.inputSal='';
            this.inputExp='';
            this.inputNotice='';
            this.searchText ='';
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

            this.subscribe('jobSeekers', () => {
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
                    keyword: parseInt(this.orderProperty)
                }
            };
            this.searchAllJob = () => {
                this.searchText = {
                    jobCategory: { '$regex' : '.*' + '' || '' + '.*', '$options' : 'i' }
                }
            };

            this.updatejobCategorySearch = () => {
                this.searchText = {
                    jobCategory: { '$regex' : '.*' + this.inputCat || '' + '.*', '$options' : 'i' }
                }
            };
            this.updateSalary = () => {
                this.searchText = {
                    expectedSalary: { $lte : this.inputSal }
                }
            };
            this.updateExperience = () => {
                this.searchText = {
                    keyword: { $lte : this.inputExp }
                }
            };
            this.updatejobLocationSearch = () => {
                this.searchText = {
                    jobLocation: { '$regex' : '.*' + this.searchInput || '' + '.*', '$options' : 'i' }
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