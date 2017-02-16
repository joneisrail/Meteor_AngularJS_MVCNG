/**
 * Created by Yasir on 1/16/2016.
 */
angular.module('socially').directive('addNewEmployerModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/Employer/add-new-employer-modal/add-new-employer-modal.html',
        controllerAs: 'addNewEmployerModal',
        controller: function ($scope, $stateParams, $reactive,  $filter) {
            $reactive(this).attach($scope);
            this.subscribe('images');

            this.helpers({
                    isLoggedIn: () => {
                    return Meteor.userId() !== null;
                },
                images: () => {
                  return Images.find({});
                }
            });

            this.companyCategory = {
                Hotel: false,
                Motel: false,
                GuestHouse: false,
                ServicedApartment:false,
                TravelAgency:false,
                Airlines:false,
                TourOperator:false,
                Restaurant:false,
                CoffeeShop:false,
                HomeDelivery:false
            };

            this.newEmployer = {};

            this.addNewEmployer = () => {
                this.newEmployer.owner = Meteor.userId();
                this.newEmployer.companyCategory=this.companyCategory;
                //this.newEmployer.images = image._id;
                // this.newEmployer.images = (this.newEmployer.images || {}).map((image) => {
                //       return image._id;
                //     });
                
                Employers.insert(this.newEmployer);

                this.newEmployer = {};
                $scope.$close();
            };

            this.addImages = (files) => {
               if (files.length > 0) {
                 let reader = new FileReader();
 
                  reader.onload = (e) => {
                    $scope.$apply(() => {
                      this.cropImgSrc = e.target.result;
                      this.myCroppedImage = '';
                    });
                  };
         
                  reader.readAsDataURL(files[0]);
                }
                else {
                  this.cropImgSrc = undefined;
               }
            };
            this.newImage={};
            this.DeleteImage = (id) => {
                // if (employerId !== null) {
                //     Employers.update({_id : employerId},{
                //                 $set:{images:this.newImage}
                //             });
                // }
                if (id !== null) {
                    Images.remove({_id: id},function(err,result){
                        if(!err){
                            
                        }
                    });                   
               }
            };  

            this.saveCroppedImage = () => {
                if (this.myCroppedImage !== '') {
                  Images.insert(this.myCroppedImage, (err, fileObj) => {
                    if (!this.newEmployer.images) {
                      this.newEmployer.images = [];
                    }
         
                    this.newEmployer.images=fileObj._id;
                    this.cropImgSrc = undefined;
                    this.myCroppedImage = '';
                  });
                }
              };
          this.getMainImage = (images) => {
            if (images && images!==null) {
              var url= $filter('filter')(this.images, {_id: images});
              if(url.length>0){
                return url[0].url();
              }         
            }
          };

        }
    }
});