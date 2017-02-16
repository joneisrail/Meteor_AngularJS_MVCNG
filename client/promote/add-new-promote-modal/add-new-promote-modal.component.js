/**
 * Created by Yasir on 1/16/2016.
 */
angular.module('socially').directive('addNewPromoteModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/promote/add-new-promote-modal/add-new-promote-modal.html',
        controllerAs: 'addNewPromoteModal',
        controller: function ($scope, $stateParams, $reactive, $filter) {
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

            this.newPromote = {};

            this.addNewPromote = () => {
                this.newPromote.owner = Meteor.userId();
                this.newPromote.public=false;
                this.newPromote.createdAt= new Date();
                Promote.insert(this.newPromote);
                this.newPromote = {};
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
                    if (!this.newPromote.images) {
                      this.newPromote.images = [];
                    }
         
                    this.newPromote.images=fileObj._id;
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