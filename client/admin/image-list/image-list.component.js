/**
 * Created by Yasir on 1/24/2016.
 */
angular.module('socially').directive('imageList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/image-list/image-list.html',
        controllerAs: 'imageList',
        controller: function ($scope, $stateParams, $reactive, $filter) {
            $reactive(this).attach($scope);

            this.subscribe('users');
            this.subscribe('images');
            this.subscribe('jobSeeker');

             this.helpers({
                    jobSeek: () => {
                    return JobSeeker.find({});
            },
            users: () => {
                return Meteor.users.find({});
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            images: () => {
              return Images.find({});
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
          // this.savePdf = ()=> {                
          //       // var doc = new jsPDF('p','pt');
          //       // this.AddData(this.users);
          //       // doc.autoTable(columns, this.users);
          //       // var specialElementHandlers = {
          //       //     '#editor': function(element, renderer){
          //       //         return true;
          //       //     }
          //       // };
                
          //       // doc.fromHTML($('#render_me').get(0), 15, 15, {
          //       // 'width': 170, 
          //       // 'elementHandlers': specialElementHandlers
          //       // });
          //       // doc.save('UserList.pdf');

          //       var printDoc = new jsPDF();
          //       printDoc.setFontSize(10);
          //       printDoc.fromHTML($('#profilePDF').get(0), 10, 10, {'width': 180});
          //       printDoc.autoPrint();
          //       printDoc.output("dataurlnewwindow"); 

          //   //     var doc = new jsPDF();
          //   // var source = $('#target').html();
          //   // var specialElementHandlers = {
          //   //     '#bypassme': function (element, renderer) {
          //   //         return true;
          //   //     }
          //   // };
          //   // doc.fromHTML(source, 0.5, 0.5, {
          //   //     'width': 75,'elementHandlers': specialElementHandlers
          //   // });
          //   // doc.output("dataurlnewwindow");

          //   };

        }
    }
});