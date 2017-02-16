/**
 * Created by Yasir on 1/19/2016.
 */
angular.module('socially').directive('newsList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/news/news-list/news-list.html',
        controllerAs: 'newsList',
        controller: function ($scope, $reactive, $modal) {
            $reactive(this).attach($scope);
            this.perPage = 5;
            this.page = 1;
            this.sort = {
                createdAt: -1
            };
            this.orderProperty = '1';
            this.searchText = '';

            this.helpers({
                news: () => {
                return News.find({}, { sort : this.getReactively('sort') });
            },
            newsCount: () => {
                return Counts.get('numberOfNews');
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
                        limit: parseInt(this.perPage),
                        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                        sort: this.getReactively('sort')
                    },
                    this.getReactively('searchText')
                ]
            });

            this.removeNews = (news) => {
                News.remove({_id: news._id});
            };
            this.updateNews = (news) => {
                News.update({_id: news._id},{
                    $set: {                       
                        Public: news.Public
                    }
                }
                , (error) => {
                if (error) {
                    Bert.alert('Oops, unable to update news...','warning');
                }
                else {Bert.alert('Update successfully..', 'info');}
                
                });
            };

            this.pageChanged = (newPage) => {
                this.page = newPage;
            };

            this.updateSort = () => {
                this.sort = {
                    name: parseInt(this.orderProperty)
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
            };

            this.openAddNewNewsModal = function () {
                $modal.open({
                    animation: true,
                    template: '<add-new-news-modal></add-new-news-modal>'
                });
            }
        }
    }
});