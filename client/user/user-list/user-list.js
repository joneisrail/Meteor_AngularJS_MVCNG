/**
 * Created by Yasir on 1/24/2016.
 */
angular.module('socially').directive('userList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/user/user-list/user-list.html',
        controllerAs: 'userList',
        controller: function ($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);
            this.perPage = 3;
            this.page = 1;
            this.sort = {
                "profile.name": 1
            };
            this.orderProperty = '1';
            this.searchText = '';

            this.helpers({
                    users: () => {
                    return Meteor.users.find({},{ sort : this.getReactively('sort') });
            },   
            userCount: () => {
                return Counts.get('numberOfUser');
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            currentUserId: () => {
                return Meteor.userId();
            }
            });

            this.subscribe('users', () => {
                return [
                    {
                        limit: parseInt(this.perPage),
                        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                        sort: this.getReactively('sort')
                    },
                    this.getReactively('searchText')
                ]
            });
            this.pageChanged = (newPage) => {
                this.page = newPage;
            };

            this.updateSort = () => {
                this.sort = {
                    name: parseInt(this.orderProperty)
                }
            };
            this.removeUser = (userId) => {
                
                return Meteor.users.remove({_id:userId});
                
            };

            this.getContactEmail = (user)=> {
                if (user.emails && user.emails.length)
                    return user.emails[0].address;

                if (user.services && user.services.facebook && user.services.facebook.email)
                    return user.services.facebook.email;

                return null;
            };

          

            var columns = [
                {title: "ID", key: "_id"},
                {title: "Name", key: "profile.name"},
                {title: "Mobile", key: "profile.mobile"},
                {title: "Email", key: "address"},
                {title: "Verified", key: "verified"}
            ];
            // this.data=[];
            // this.userobj={
            //      _id: '',
            //     name: '',
            //     mobile: '',
            //     address: '',
            //     verified:''
            // };

            // this.AddData =(users)=> {
            //     for (var i = users.length - 1; i >= 0; i--) {
                    
            //          this.userobj._id= users[i]._id,
            //          this.userobj.name= users[i].profile.name,
            //          this.userobj.mobile= users[i].profile.mobile,
            //          this.userobj.address= users[i].emails[0].address,
            //          this.userobj.verified= users[i].emails[0].verified
            //         this.data.push(userobj);

            //     };
            // };
            // All units are in the set measurement for the document
            // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
            

            this.downloadPdf = ()=> {                
                // var doc = new jsPDF('p','pt');
                // this.AddData(this.users);
                // doc.autoTable(columns, this.users);
                // var specialElementHandlers = {
                //     '#editor': function(element, renderer){
                //         return true;
                //     }
                // };
                
                // doc.fromHTML($('#render_me').get(0), 15, 15, {
                // 'width': 170, 
                // 'elementHandlers': specialElementHandlers
                // });
                // doc.save('UserList.pdf');
                var printDoc = new jsPDF();
                printDoc.setFontSize(10);
                printDoc.fromHTML($('#pdf').get(0), 10, 10, {'width': 180});
                printDoc.autoPrint();
                printDoc.output("dataurlnewwindow"); 
            };

        }
    }
});