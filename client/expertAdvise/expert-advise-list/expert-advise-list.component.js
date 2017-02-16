angular.module('socially').directive('expertAdviseList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/expertAdvise/expert-advise-list/expert-advise-list.html',
        controllerAs: 'expertAdviseList',
        controller: function ($scope, $reactive, $modal) {
            $reactive(this).attach($scope);
            this.perPage = 5;
            this.page = 1;
            this.sort = {
                heading: 1
            };
            
            this.orderProperty = '1';
            this.searchText = '';

            this.helpers({
                expertAdvises: () => {
                return ExpertAdvise.find({}, { sort : this.getReactively('sort') });
            },
            expertAdviseCount: () => {
                return Counts.get('numberOfExpertAdvise');
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
                        limit: parseInt(this.perPage),
                        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                        sort: this.getReactively('sort')
                    },
                    this.getReactively('searchText')
                ]
            });

            this.removeExpertAdvise = (expertAdvise) => {
                ExpertAdvise.remove({_id: expertAdvise._id});
            };
            this.updateExpertAdvise = (expertAdvise) => {
                ExpertAdvise.update({_id: expertAdvise._id},{
                    $set: {                       
                        Public: expertAdvise.Public
                    }
                }
                , (error) => {
                if (error) {
                   Bert.alert('Oops, unable to update the expert advise...','warning');
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
            };

            this.openAddNewExpertAdviseodal = function () {
                $modal.open({
                    animation: true,
                    template: '<add-new-expert-advise-modal></add-new-expert-advise-modal>'
                });
            }
        }
    }
});