/**
 * Created by Yasir on 1/26/2016.
 */
angular.module('socially').directive('viewAdmin', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/view-admin/view-admin.html',
        controllerAs: 'viewAdmin',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);
            this.subscribe('jobs');
            this.subscribe('users');


            this.helpers({
                    job: () => {
                    return  Jobs.findOne({_id:Meteor.userId()});
        },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            }
        });
            this.close=()=>{
                $scope.$close();
            };


        }
    }
});