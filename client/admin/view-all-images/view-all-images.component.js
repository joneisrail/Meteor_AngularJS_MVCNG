angular.module('socially').directive('allimageList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/view-all-images/view-all-images.html',
        controllerAs: 'allimageList',
        controller: function ($scope, $reactive, $filter) {
            $reactive(this).attach($scope);
            this.perPage = 5;
            this.page = 1;
            this.sort = {
                heading: 1
            };
            this.orderProperty = '1';
            this.searchText = '';
            
            this.subscribe('images');
            this.subscribe('users');

            this.helpers({
                images: () => {
                return Images.find({});
            },
            imageCount: () => {
                return Counts.get('numberOfImage');
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            currentUserId: () => {
                return Meteor.userId();
            }
        });

           
            // this.subscribe('images', () => {
            //     return [
            //         {
            //             limit: parseInt(this.perPage),
            //             skip: parseInt((this.getReactively('page') - 1) * this.perPage),
            //             sort: this.getReactively('sort')
            //         },
            //         this.getReactively('searchText')
            //     ]
            // });

              this.DeleteImage = (id,jobSeekerId) => {
                if (jobSeekerId !== null) {
                    JobSeeker.update({_id : jobSeekerId},{
                        $set:{images:this.newImage}
                    });
                }
                if (id !== null) {
                    Images.remove({_id: id},function(err,result){
                        if(!err){
                            Bert.alert('Remove successfully..', 'info');
                        }else{Bert.alert('Remove fail..', 'warning');}
                    });                   
               }
            };
          
            this.pageChanged = (newPage) => {
                this.page = newPage;
            };

            this.updateSort = () => {
                this.sort = {
                    heading: parseInt(this.orderProperty)
                }
            };
            this.getMainImage = (image) => {
                if (image && image!==null) {
                  var url= $filter('filter')(this.images, {_id: image});
                  if(url.length>0){
                    return url[0].url();
                  }         
                }
              };  

            this.getImageCreator = function(image){
                if (!image) {
                    return '';
                }

                let owner = Meteor.users.findOne(image.owner);

                if (!owner) {
                    return 'nobody';
                }

                if (Meteor.userId() !== null && owner._id === Meteor.userId()) {
                    return 'me';
                }

                return owner;
            };
        }
    }
});