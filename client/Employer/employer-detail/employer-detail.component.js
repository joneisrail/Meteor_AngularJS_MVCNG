/**
 * Created by Yasir on 1/19/2016.
 */
angular.module('socially').directive('employerDetail', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/Employer/employer-detail/employer-detail.html',
        controllerAs: 'employerDetail',
        controller: function ($scope, $stateParams, $reactive, $filter) {
            $reactive(this).attach($scope);

            this.subscribe('employer');
            this.subscribe('users');
            this.subscribe('images');

            this.helpers({
                    employer: () => {
                    return Employers.findOne({_id: $stateParams.employerId});
            },
            users: () => {
                return Meteor.users.find({});
            },
            isLoggedIn: () => {
                return Meteor.userId() !== null;
            },
            currentUserId: () => {
                return Meteor.userId();
            },
            images: () => {
              return Images.find({});
            }
            });
            this.newImage={};

            this.DeleteImage = (id,employerId) => {
                if (employerId !== null) {
                    Employers.update({_id : employerId},{
                                $set:{images:this.newImage}
                            });
                }
                if (id !== null) {
                    Images.remove({_id: id},function(err,result){
                        if(!err){
                            
                        }
                    });                   
               }
            };  
            this.newEmployer={};
            
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

            this.EmployerUpdate = () => {
                if(this.employer._id == null)
                {

                    this.newEmployer.owner = Meteor.userId();
                    this.newEmployer.createdAt= new Date();
                    
                    this.employer._id=Employers.insert(this.newEmployer);

                }  
                Employers.update({_id: this.employer._id},{
                    $set: {
                        companyName: this.employer.companyName,
                        companyInformation: this.employer.companyInformation,
                        address: this.employer.address,
                        district: this.employer.district,
                        postCode: this.employer.postCode,
                        hrMail: this.employer.hrMail,
                        companyLogo: this.employer.companyLogo,
                        contactPerson: this.employer.contactPerson,
                        designation: this.employer.designation,
                        phoneNumber: this.employer.phoneNumber,
                        companyWebUrl: this.employer.companyWebUrl,
                        companyEmail: this.employer.companyEmail,
                        companyCategory:this.employer.companyCategory,
                        isHomePage:this.employer.isHomePage
                    }
                }
                    , (error) => {
                    if (error) {
                        Bert.alert('Oops, unable to update the jobs...', 'warning');

                    }
                    else {
                        Bert.alert('Update successfully..', 'info');
                    history.back();

            }
            });
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
            this.saveCroppedImage = (emplId) => {
                if (this.myCroppedImage !== '') {
                  Images.insert(this.myCroppedImage, (err, fileObj) => {
                    if (!this.employer.images) {
                      this.employer.images = [];
                    }
                    if(emplId!==null){
                        Employers.update({_id : emplId},{
                                $set:{images:fileObj._id}
                            });
                        // this.employer.images.push(fileObj);
                    }        
                    
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