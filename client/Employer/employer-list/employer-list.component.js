/**
 * Created by Yasir on 1/19/2016.
 */
angular.module('socially').directive('employerList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/Employer/employer-list/employer-list.html',
        controllerAs: 'employerList',
        controller: function ($scope, $reactive, $modal, $filter) {
            $reactive(this).attach($scope);
            this.perPage = 20;
            this.page = 1;
            this.sort = {
                createdAt: -1
            };
            this.orderProperty = '1';
            this.searchText = '';

            this.helpers({
                    employers: () => {
                    return Employers.find({}, { sort : this.getReactively('sort') });
            },
            employerCount: () => {
                return Counts.get('numberOfEmployers');
            },
            users: () => {
                return Meteor.users.find({});
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            images : ()=>{
                return Images.find({});
            },
            currentUserId: () => {
                return Meteor.userId();
            }
        });

            this.subscribe('users');
            this.subscribe('images');

            this.subscribe('employer', () => {
                return [
                    {
                        limit: parseInt(this.perPage),
                        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                        sort: this.getReactively('sort')
                    },
                    this.getReactively('searchText')
                ]
            });

            this.getMainImage = (images) => {
                if (images && images!==null) {
                  var url= $filter('filter')(this.images, {_id: images});
                  if(url.length>0){
                    return url[0].url();
                  }         
                }
              };

            this.removeEmployer = (employer) => {
                Employers.remove({_id: employer._id});
            };

            this.pageChanged = (newPage) => {
                this.page = newPage;
            };

            this.updateSort = () => {
                this.sort = {
                    createdAt: parseInt(this.orderProperty)
                }
            };

            this.getEmployerCreator = function(employer){
                if (!employer) {
                    return '';
                }

                let owner = Meteor.users.findOne(employer.owner);

                if (!owner) {
                    return 'nobody';
                }

                if (Meteor.userId() !== null && owner._id === Meteor.userId()) {
                    return 'me';
                }

                return owner;
            };

            // this.getUserById = (userId) => {
            //     return Meteor.employer.findOne(userId);
            // };

            this.EmployerUpdate = (employer) => {
                Employers.update({_id: employer._id},{
                    $set: {                       
                        isHomePage: employer.isHomePage,
                        isAbleCVSearch: employer.isAbleCVSearch
                    }
                }
                , (error) => {
                if (error) {
                    Bert.alert('Oops, unable to update employer...','warning');
                }
                else {Bert.alert('Update successfully..', 'info');}
                
                });
            };


            this.openAddNewEmployerModal = function () {
                $modal.open({
                    animation: true,
                    template: '<add-new-employer-modal></add-new-employer-modal>'
                });
            };

        }
    }
});