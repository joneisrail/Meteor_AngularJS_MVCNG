angular.module('socially').directive('companyList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/company/company-list/company-list.html',
        controllerAs: 'companyList',
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
                company: () => {
                return Company.find({}, { sort : this.getReactively('sort') });
            },
            expertAdviseCount: () => {
                return Counts.get('numberOfCompany');
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            currentUserId: () => {
                return Meteor.userId();
            }
        });

            
            this.subscribe('users');
            this.subscribe('company', () => {
                return [
                    {
                        limit: parseInt(this.perPage),
                        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                        sort: this.getReactively('sort')
                    },
                    this.getReactively('searchText')
                ]
            });

            this.removeCompany = (company) => {
                Company.remove({_id: company._id});
            };
            this.updateCompany = (company) => {
                Company.update({_id: company._id},{
                    $set: {                       
                        Public: company.Public
                    }
                }
                , (error) => {
                if (error) {
                    Bert.alert('Oops, unable to update company...');
                }
                else {Bert.alert('Update successfully..', 'info');}
                
                });
            };

            this.pageChanged = (newPage) => {
                this.page = newPage;
            };

            this.updateSort = () => {
                this.sort = {
                    createdAt: parseInt(this.orderProperty)
                }
            };
            

            this.openAddNewCompany = function () {
                $modal.open({
                    animation: true,
                    template: '<add-new-company-modal></add-new-company-modal>'
                });
            }
        }
    }
});