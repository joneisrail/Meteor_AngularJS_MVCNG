/**
 * Created by Yasir on 1/20/2016.
 */
angular.module('socially').directive('home', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/home/home-page/home.html',
        controllerAs: 'home',
        controller: function ($scope, $reactive, $modal, $filter) {
            $reactive(this).attach($scope);
            this.perPage = 10;
            this.page = 1;
            this.sort = {
                jobTitle: 1
            };
            this.orderProperty = '1';
            this.searchInput='';
            this.searchText = {
                jobTitle: { '$regex' : '.*' + this.searchInput || '' + '.*', '$options' : 'i' },
                $or:[{$and:[{"Public":true},{"Public":{$exists:true}}]}]
                 // jobTitle: /^'searchText'/i;
            };

            this.helpers({
                jobs: () => {
                return Jobs.find({}, { sort : this.getReactively('sort') });
            },
            users: () => {
                return Meteor.users.find({});
            },            
            employers: () => {
                return Employers.find({isHomePage:true});
            },
            jobCount: () => {
                return Counts.get('numberOfJobs');
            },            
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            promotes: () => {
                return Promote.findOne({public : true});                    
            },
            company: () =>{
                return Company.find({Public : true});
            },
            expertAdvise: () =>{
                return ExpertAdvise.find({Public:true});
            },            
            images : ()=>{
                return Images.find({});
            },
            currentUserId: () => {
                return Meteor.userId();
            }

        });
            //console.log(Meteor.settings.public.ga.account);
            this.subscribe('users');
            this.subscribe('expertAdvise');
            this.subscribe('company');            
            this.subscribe('promote');
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

            this.pageChanged = (newPage) => {
                this.page = newPage;
            };

            this.getMainImage = (images) => {
                if (images && images!==null) {
                  var url= $filter('filter')(this.images, {_id: images});
                  if(url.length>0){
                    return url[0].url();
                  }         
                }
              };

            this.updateSort = () => {
                this.sort = {
                    name: parseInt(this.orderProperty)
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


            this.joblistByEmployer = (jobOwner)=>{

                return this.jobs.find({owner : jobOwner});

            };

             this.jobByOwner = (jobOwner)=>{

                return Jobs.findOne({owner : jobOwner});

            };
            
            this.rsvp = (jobId, rsvp) => {
                Meteor.call('rsvp', jobId, rsvp, (error) => {
                    if (error) {
                        console.log('Oops, unable to rsvp!');
                    }
                    else {
                        console.log('RSVP Done!');
            }
            });
            };

            this.getUserById = (userId) => {
                return Meteor.users.findOne(userId);
            };

            this.outstandingInvitations = (job) => {
                return _.filter(this.users, (user) => {
                        return (_.contains(job.invited, user._id) && !_.findWhere(job.rsvps, {user: user._id}));
            });
            };

            this.openJobModal = function (jobId) {
                Session.set('jobId', jobId),
                $modal.open({
                    animation: true,
                    template: '<job-detail-modal></job-detail-modal>'
                });
            };

            $scope.addAlert = function() {
                $scope.alerts.push({msg: 'Another alert!'});
            };

            this.isRSVP = (rsvp, job) => {
                if (Meteor.userId() == null) {
                    return false;
                }

                let rsvpIndex = job.myRsvpIndex;
                rsvpIndex = rsvpIndex || _.indexOf(_.pluck(job.rsvps, 'user'), Meteor.userId());

                if (rsvpIndex !== -1) {
                    job.myRsvpIndex = rsvpIndex;
                    return job.rsvps[rsvpIndex].rsvp === rsvp;
                }
            }
            
        }
    }
});