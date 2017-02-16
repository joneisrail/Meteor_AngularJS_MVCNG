/**
 * Created by Yasir on 1/16/2016.
 */
angular.module('socially').directive('addNewNewsModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/news/add-new-news-modal/add-new-news-modal.html',
        controllerAs: 'addNewNewsModal',
        controller: function ($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);

            this.helpers({
                    isLoggedIn: () => {
                    return Meteor.userId() !== null;
                }
            });

            this.newNews = {};

            this.addNewNews = () => {
                this.newNews.owner = Meteor.userId();
                this.newNews.Public=false;
                this.newNews.createdAt= new Date();
                News.insert(this.newNews);
                this.newNews = {};
                $scope.$close();
            };
        }
    }
});