/**
 * Created by Yasir on 1/16/2016.
 */
angular.module('socially').directive('addNewCompanyModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/company/add-new-company-modal/add-new-company-modal.html',
        controllerAs: 'addNewCompanyModal',
        controller: function ($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);

            this.helpers({
                    isLoggedIn: () => {
                    return Meteor.userId() !== null;
                }
            });

            this.newCompnay = {};

            this.addNewCompany = () => {
                this.newCompnay.owner = Meteor.userId();
                this.newCompnay.Public=false;
                this.createdAt=new Date();
                Company.insert(this.newCompnay);
                this.newCompnay = {};
                $scope.$close();
            };
        }
    }
});