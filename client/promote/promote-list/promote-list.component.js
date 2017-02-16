/**
 * Created by Yasir on 1/19/2016.
 */
angular.module('socially').directive('promoteList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/promote/promote-list/promote-list.html',
        controllerAs: 'promoteList',
        controller: function ($scope, $reactive, $modal, $filter) {
            $reactive(this).attach($scope);
            this.perPage = 5;
            this.page = 1;
            this.sort = {
                heading: 1
            };
            this.orderProperty = '1';
            this.searchText = '';

            this.helpers({
                promotes: () => {
                return Promote.find({}, { sort : this.getReactively('sort') });
            },
            promoteCount: () => {
                return Counts.get('numberOfPromote');
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

            this.subscribe('promote', () => {
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

            this.removePromote = (promote) => {
                Promote.remove({_id: promote._id});
            };
            this.updatePromote = (promote) => {
                Promote.update({_id: promote._id},{
                    $set: {                       
                        public: promote.public
                    }
                }
                , (error) => {
                if (error) {
                    Bert.alert('Oops, unable to update...','warning');
                }
                else {Bert.alert('Update successfully..', 'info');}
                
                });
            };

            this.pageChanged = (newPage) => {
                this.page = newPage;
            };

            this.updateSort = () => {
                this.sort = {
                    heading: parseInt(this.orderProperty)
                }
            };
            this.getPromoteCreator = function(promote){
                if (!promote) {
                    return '';
                }

                let owner = Meteor.users.findOne(promote.owner);

                if (!owner) {
                    return 'nobody';
                }

                if (Meteor.userId() !== null && owner._id === Meteor.userId()) {
                    return 'me';
                }

                return owner;
            };

            this.openAddNewPromoteModal = function () {
                $modal.open({
                    animation: true,
                    template: '<add-new-promote-modal></add-new-promote-modal>'
                });
            }
        }
    }
});