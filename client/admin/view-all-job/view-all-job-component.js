/**
 * Created by Yasir on 1/20/2016.
 */
angular.module('socially').directive('viewAllJob', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/view-all-job/view-all-job.html',
        controllerAs: 'viewAllJob',
        controller: function ($scope, $reactive, $modal) {
           $reactive(this).attach($scope);
            this.perPage = 5;
            this.page = 1;
            this.published=true;
            this.searchInput='';
            this.searchText = {
                jobTitle: { '$regex' : '.*' + this.searchInput || '' + '.*', '$options' : 'i' }
                 // jobTitle: /^'searchText'/i;
            };
            this.sort = {
                 createdAt: -1 //{ sku: { $regex: /^ABC/i } } jobTitle: { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' }
               
            };
            this.empty='';
            this.orderProperty = '1';
            this.jobType = '0';
            this.jobCategory = '0';

            this.helpers({
                jobs: () => {
                return Jobs.find({}, { sort : this.getReactively('sort') });
            },
            users: () => {
                return Meteor.users.find({});
            },
            jobCounting: () => {
                return Counts.get('numberOfJobs');
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            currentUserId: () => {
                return Meteor.userId();
            }

        });

            this.subscribe('users');

            this.subscribe('jobs', () => {
                return [
                    {
                        limit: parseInt(this.perPage),
                        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                        sort: this.getReactively('sort')
                    },
                    this.getReactively('searchText')
                ]
            });

            this.removeJob = (job) => {
                Jobs.remove({_id: job._id});
            };

            this.jobUpdate = (job) => {
                Jobs.update({_id: job._id},{
                    $set: {                       
                        Public: job.Public
                    }
                }
                , (error) => {
                if (error) {
                    Bert.alert('Oops, unable to update the jobs...', 'warning');
                }
                else {Bert.alert('Update successfully..', 'info');}
                
                });
            };

            this.pageChanged = (newPage) => {
                this.page = newPage;
            };

           this.updateSort = () => {
                this.sort = {
                    createdAt: parseInt(this.orderProperty)
                }
            };
            this.updateSearch = () => {
                this.searchText = {
                    jobTitle: { '$regex' : '.*' + this.searchInput || '' + '.*', '$options' : 'i' }
                }
            };
             this.searchByPublished = () => {
                this.searchText = {
                    jobTitle: { '$regex' : '.*' + this.searchInput || '' + '.*', '$options' : 'i' },
                    $or:[{$and:[{"Public": this.published },{"Public":{$exists: this.published }}]}]
                }
            };
            this.searchAllJob = () => {
                this.searchInput='';
                this.searchText = {
                    jobTitle: { '$regex' : '.*' + this.searchInput || '' + '.*', '$options' : 'i' }
                }
            };

            this.searchByType =()=>{

                if(this.jobType== '0'){
                    this.jobType='';
                }
                this.searchText = {
                       jobType: { '$regex' : '.*' + this.jobType || '' + '.*', '$options' : 'i' }                 
                    }
                if(this.jobType== ''){
                    this.jobType='0';
                }
            };
            this.searchByjobCategory =()=>{
                if(this.jobCategory=='0'){
                    this.jobCategory='';
                }
                this.searchText = {
                    jobCategory: { '$regex' : '.*' + this.jobCategory || '' + '.*', '$options' : 'i' }           
                }
                if(this.jobCategory==''){
                    this.jobCategory='0';
                }
            };

            this.getJobCreator = function(job){
                if (!job) {
                    return '';
                }
                let owner = Meteor.users.findOne(job.owner);

                if (!owner) {
                    return 'nobody';
                }

                if (Meteor.userId() !== null && owner._id === Meteor.userId()) {
                    return 'me';
                }

                return owner;
            };

            this.getUserById = (userId) => {
                return Meteor.users.findOne(userId);
            };

            this.openAddNewJobModal = function () {
                $modal.open({
                    animation: true,
                    template: '<add-new-job-modal></add-new-job-modal>'
                });
            };
           
           
        }
    }
});