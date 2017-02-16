/**
 * Created by Yasir on 1/19/2016.
 */
angular.module('socially').directive('newsDetail', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/news/news-detail/news-detail.html',
        controllerAs: 'newsDetail',
        controller: function ($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);

            this.subscribe('news');
            this.subscribe('users');

            this.helpers({
                    news: () => {
                    return News.findOne({_id: $stateParams.newsId});
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            currentUserId: () => {
                return Meteor.userId();
            }
        });



        this.newsUpdate =() => {
            News.update({_id: $stateParams.newsId}, {
                $set: {
                    heading:this.news.heading,
                    date:this.news.date,
                    url:this.news.url,
                    detail:this.news.detail,
                    post:this.news.post,
                    summary:this.news.summary
                   
                }
            }, (error) => {
                if (error) {
                    Bert.alert('Oops, unable to update news...','warning');
                }
                else {
                    Bert.alert('Update successfully..', 'info');
            history.back()
        }
        });
        };


        }
    }
});