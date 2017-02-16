angular.module('socially').directive('adviseList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/home/hospitality/advise-list/advise-list.html',
        controllerAs: 'adviseList',
        controller: function ($scope, $reactive, $modal) {
            $reactive(this).attach($scope);
            this.sort = {
                createdAt: -1
            };
            
            this.orderProperty = '1';
            this.searchText = '';

            this.helpers({
                expertAdvises: () => {
                return ExpertAdvise.find({"Public" : true}, { sort : this.getReactively('sort') });
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            currentUserId: () => {
                return Meteor.userId();
            }
        });

            
            this.subscribe('users');
            this.subscribe('expertAdvise', () => {
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
            this.getExpertAdviceCreator = function(expert){
                if (!expert) {
                    return '';
                }

                let owner = Meteor.users.findOne(expert.owner);

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