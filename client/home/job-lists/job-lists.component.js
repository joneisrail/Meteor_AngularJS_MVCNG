/**
 * Created by Yasir on 1/19/2016.
 */
angular.module('socially').directive('jobLists', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/home/job-lists/job-lists.html',
        controllerAs: 'jobLists',
        controller: function ($scope, $stateParams, $reactive, $modal) {
            $reactive(this).attach($scope);
            this.perPage = 15;
            this.page = 1;
            this.hrmail='';
            this.companyname='';
            this.catID=$stateParams.cat;

            this.searchInput='';
            this.searchText = {
                jobTitle: { '$regex' : '.*' + this.searchInput || '' + '.*', '$options' : 'i' },
                $or:[{$and:[{"Public":true},{"Public":{$exists:true}}]}]
                 // jobTitle: /^'searchText'/i;
            };
            this.sort = {
                createdAt: -1
            };
            
            this.empty='';
            this.orderProperty = '-1';
            this.jobType = '0';
            this.jobCategory = $stateParams.cat;
            
               
            this.helpers({
                jobs: () => {
                if(parseInt($stateParams.cat) >0){
                
                this.searchText = {
                    jobCategory: { '$regex' : '.*' + this.jobCategory || '' + '.*', '$options' : 'i' },
                    $or:[{$and:[{"Public":true},{"Public":{$exists:true}}]}]                 
                    }
                return Jobs.find({}, { sort : this.getReactively('sort') });
                }else{
                    return Jobs.find({}, { sort : this.getReactively('sort') });
                }
            },
            users: () => {
                return Meteor.users.find({});
            },            
            jobCount: () => {
                return Counts.get('numberOfJobs');
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
             images: () => {
              return Images.find({});
            },
            currentUserId: () => {
                return Meteor.userId();
            }
        });

            this.subscribe('users');
            this.subscribe('employer');
            this.subscribe('images');

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
            this.openJobModal=(jobId)=>{
                    Session.set('jobId', jobId);
                    $modal.open({
                    animation: true,
                    template: '<job-detail-modal></job-detail-modal>'
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
                    jobTitle: { '$regex' : '.*' + this.searchInput || '' + '.*', '$options' : 'i' },
                    $or:[{$and:[{"Public":true},{"Public":{$exists:true}}]}]                 
                }
            };
            this.searchAllJob = () => {
                this.searchInput='';
                this.searchText = {
                    jobTitle: { '$regex' : '.*' + this.searchInput || '' + '.*', '$options' : 'i' },
                    $or:[{$and:[{"Public":true},{"Public":{$exists:true}}]}]                 
                }
            };

            this.searchByType =()=>{

                if(this.jobType== '0'){
                    this.jobType='';
                }
                this.searchText = {
                       jobType: { '$regex' : '.*' + this.jobType || '' + '.*', '$options' : 'i' },
                       $or:[{$and:[{"Public":true},{"Public":{$exists:true}}]}]                                    
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
                    jobCategory: { '$regex' : '.*' + this.jobCategory || '' + '.*', '$options' : 'i' },
                    $or:[{$and:[{"Public":true},{"Public":{$exists:true}}]}]                 
                }
                if(this.jobCategory==''){
                    this.jobCategory='0';
                }
            };
            this.getMainImage = (images) => {
                if (images && images!==null) {
                  var url= $filter('filter')(this.images, {_id: images});
                  if(url.length>0){
                    return url[0].url();
                  }         
                }
              };
                   
        }
    }
});