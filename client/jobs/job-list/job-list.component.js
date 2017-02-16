/**
 * Created by Yasir on 1/19/2016.
 */
angular.module('socially').directive('jobList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/jobs/job-list/job-list.html',
        controllerAs: 'jobList',
        controller: function ($scope, $reactive, $modal) {
            $reactive(this).attach($scope);
            this.perPage = 5;
            this.page = 1;
            this.sort = {
                jobTitle: 1
            };
            this.orderProperty = '1';
            this.searchInput='';
            this.searchText = {
                jobTitle: { '$regex' : '.*' + this.searchInput || '' + '.*', '$options' : 'i' },
                $or:[{$and:[{"owner":Meteor.userId()},{"owner":{$exists:Meteor.userId()}}]}]
                 // jobTitle: /^'searchText'/i;
            };

            this.helpers({
                jobs: () => {
                return Jobs.find({}, { sort : this.getReactively('sort') });
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

            this.pageChanged = (newPage) => {
                this.page = newPage;
            };

            this.updateSort = () => {
                this.sort = {
                    jobTitle: parseInt(this.orderProperty)
                }
            };
             this.updateSearch = () => {
                this.searchText = {
                    jobTitle: { '$regex' : '.*' + this.searchInput || '' + '.*', '$options' : 'i' },
                    $or:[{$and:[{"owner":Meteor.userId()},{"owner":{$exists:Meteor.userId()}}]}]
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