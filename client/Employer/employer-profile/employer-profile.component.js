/**
 * Created by Yasir on 1/19/2016.
 */
angular.module('socially').directive('employerProfile', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/Employer/employer-profile/employer-profile.html',
        controllerAs: 'employerProfile',
        controller: function ($scope, $stateParams, $reactive, $filter) {
            $reactive(this).attach($scope);

            this.subscribe('employer');
            this.subscribe('users');
            this.subscribe('images');

            this.helpers({
                    employer: () => {
                    return Employers.findOne({ owner: Meteor.userId()});
            },
            users: () => {
                return Meteor.users.find({});
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
        this.getMainImage = (images) => {
            if (images && images!==null) {
              var url= $filter('filter')(this.images, {_id: images});
              if(url.length>0){
                return url[0].url();
              }         
            }
          };

        this.getEmployer=function(){
            return Employers.find({});
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