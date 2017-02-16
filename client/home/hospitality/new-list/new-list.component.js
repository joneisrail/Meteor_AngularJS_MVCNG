/**
 * Created by Yasir on 1/19/2016.
 */
angular.module('socially').directive('newList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/home/hospitality/new-list/new-list.html',
        controllerAs: 'newList',
        controller: function ($scope, $reactive, $modal) {
            $reactive(this).attach($scope);
            this.sort = {
                createdAt: -1
            };
            this.orderProperty = '1';
            this.searchText = '';

            this.helpers({
                news: () => {
                return News.find({"Public" : true}, { sort : this.getReactively('sort') });
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            currentUserId: () => {
                return Meteor.userId();
            }
        });

            this.subscribe('users');

            this.subscribe('news', () => {
                return [
                    {
                        sort: this.getReactively('sort')
                    },
                    this.getReactively('searchText')
                ]
            });

            
            this.updateSort = () => {
                this.sort = {
                    createdAt: parseInt(this.orderProperty)
                }
            };
            this.getNewsCreator = function(news){
                if (!news) {
                    return '';
                }

                let owner = Meteor.users.findOne(news.owner);

                if (!owner) {
                    return 'nobody';
                }

                if (Meteor.userId() !== null && owner._id === Meteor.userId()) {
                    return 'me';
                }

                return owner;
            }
        }
    }
});