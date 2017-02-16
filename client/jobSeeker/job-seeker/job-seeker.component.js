
angular.module('socially').directive('jobSeekerView', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/jobSeeker/job-seeker/job-seeker-view.html',
        controllerAs: 'jobSeekerView',
        controller: function ($scope,$stateParams, $reactive,  $filter) {
            $reactive(this).attach($scope);

            this.subscribe('jobSeeker');
            this.subscribe('users');
            this.subscribe('images');

            this.helpers({
                jobSeeker: () => {
                return JobSeeker.findOne(
                    {
                        $or:[{ _id: $stateParams.jobSeekerId},{ owner: Meteor.userId()}] 
                    });
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
         this.newJobSeeker={};
       
            this.update = () => {
                if(this.jobSeeker._id == null)
                {

                    this.newJobSeeker.owner = Meteor.userId();
                    this.newJobSeeker.createdAt= new Date();
                    
                    this.jobSeeker._id=JobSeeker.insert(this.newJobSeeker);

                }                
                JobSeeker.update({_id: this.jobSeeker._id}, {
                    $set: {
                        name:this.jobSeeker.name,
                        fatherName:this.jobSeeker.fatherName,
                        motherName:this.jobSeeker.motherName,
                        dateOfBirth:this.jobSeeker.dateOfBirth,
                        gender:this.jobSeeker.gender,
                        maritalStatus:this.jobSeeker.maritalStatus,
                        nationality:this.jobSeeker.nationality,
                        nationaId:this.jobSeeker.nationaId,
                        religion:this.jobSeeker.religion,
                        presentAddress:this.jobSeeker.presentAddress,
                        currentLocation:this.jobSeeker.currentLocation,
                        homePhone:this.jobSeeker.homePhone,
                        mobile:this.jobSeeker.mobile,
                        officePhone:this.jobSeeker.officePhone,
                        email:this.jobSeeker.email,
                        alternateEmail:this.jobSeeker.alternateEmail,

                        objective:this.jobSeeker.objective,
                        presentSalary:this.jobSeeker.presentSalary,
                        expectedSalary:this.jobSeeker.expectedSalary,
                        lookingFor:this.jobSeeker.lookingFor,
                        availableFor:this.jobSeeker.availableFor,

                        jobCategory:this.jobSeeker.jobCategory,
                        jobLocation:this.jobSeeker.jobLocation,
                        orgType:this.jobSeeker.orgType,
                        careerSummary:this.jobSeeker.careerSummary,
                        specialQalification:this.jobSeeker.specialQalification,
                        keyword:this.jobSeeker.keyword,

                        trainingSummary:this.jobSeeker.trainingSummary,
                        professionalSummary:this.jobSeeker.professionalSummary,

                    }
                }, (error) => {
                    if (error) {
                        Bert.alert('Oops, unable to updates...','warning','growl-top-left');
                    }
                    else {
                        Bert.alert('Update successfully..', 'info','growl-top-left');
                    }
            });
            };

            this.updateQualification = () =>{
                JobSeeker.update(this.jobSeeker._id,{
                 $push:{qualification:{
                     levelEduction:this.jobSeeker.levelEduction,
                     degreeTitle:this.jobSeeker.degreeTitle,
                     instituteName:this.jobSeeker.instituteName,
                     result:this.jobSeeker.result,
                     passingYear:this.jobSeeker.passingYear,
                     duration:this.jobSeeker.duration,
                     achievement:this.jobSeeker.achievement,
                 }}
                }, (error) => {
                    if (error) {
                        Bert.alert('Oops, unable to updates...','warning','growl-top-left');
                    }
                    else {
                        Bert.alert('Update successfully..', 'info','growl-top-left');
                    }
                });
            };
            this.removeQualification = (qual) =>{
                JobSeeker.update(this.jobSeeker._id,{
                    $pull:{qualification:{degreeTitle:qual}}
                }, (error) => {
                    if (error) {
                        Bert.alert('Oops, unable to remove...','warning','growl-top-left');
                    }
                    else {
                        Bert.alert('Remove successfully..', 'info','growl-top-left');
                    }
                });
            };

            this.updateExperience = () =>{
                JobSeeker.update(this.jobSeeker._id,{
                    $push:{experience:{
                        companyName:this.jobSeeker.companyName,
                        position:this.jobSeeker.position,
                        responsibility:this.jobSeeker.responsibility,
                        fromDate:this.jobSeeker.fromDate,
                        toDate:this.jobSeeker.toDate
                    }}
                }, (error) => {
                    if (error) {
                        Bert.alert('Oops, unable to updates...','warning','growl-top-left');
                    }
                    else {
                        Bert.alert('Update successfully..', 'info','growl-top-left');
                    }
                });
            };
            this.removeExperience = (exp) =>{
                JobSeeker.update(this.jobSeeker._id,{
                    $pull:{experience:{companyName:exp}}
                }, (error) => {
                    if (error) {
                        Bert.alert('Oops, unable to remove...','warning','growl-top-left');
                    }
                    else {
                        Bert.alert('Remove successfully..', 'info','growl-top-left');
                    }
                });
            };

            this.updateLanguages = () =>{
                JobSeeker.update(this.jobSeeker._id,{
                    $push:{languages:{
                        language:this.jobSeeker.language,
                        reading:this.jobSeeker.reading,
                        writing:this.jobSeeker.writing,
                        speaking:this.jobSeeker.speaking
                    }}
                }, (error) => {
                    if (error) {
                        Bert.alert('Oops, unable to updates...','warning','growl-top-left');
                    }
                    else {
                        Bert.alert('Update successfully..', 'info','growl-top-left');
                    }
                });
            };
            this.removeLanguages = (lang) =>{
                JobSeeker.update(this.jobSeeker._id,{
                    $pull:{languages:{language:lang}}
                }, (error) => {
                    if (error) {
                        Bert.alert('Oops, unable to remove...','warning','growl-top-left');
                    }
                    else {
                        Bert.alert('Remove successfully..', 'info','growl-top-left');
                    }
                });
            };

            this.updateReference = () =>{
                JobSeeker.update(this.jobSeeker._id,{
                    $push:{reference:{
                        refName:this.jobSeeker.refName,
                        refCompany:this.jobSeeker.refCompany,
                        refDesignation:this.jobSeeker.refDesignation,
                        refAddress:this.jobSeeker.refAddress,
                        refMobile:this.jobSeeker.refMobile
                    }}
                }, (error) => {
                    if (error) {
                        Bert.alert('Oops, unable to updates...','warning','growl-top-left');
                    }
                    else {
                        Bert.alert('Update successfully..', 'info','growl-top-left');
                    }
                });
            };
            this.removeReference = (referenceName) =>{
                JobSeeker.update(this.jobSeeker._id,{
                    $pull:{reference:{refName:referenceName}}
                }, (error) => {
                    if (error) {
                        Bert.alert('Oops, unable to remove...','warning','growl-top-left');
                    }
                    else {
                        Bert.alert('Remove successfully..', 'info','growl-top-left');
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

            this.saveCroppedImage = (jobSeekerId) => {
                if (this.myCroppedImage !== '') {
                  Images.insert(this.myCroppedImage, (err, fileObj) => {
                    if (!this.jobSeeker.images) {
                      this.jobSeeker.images = '';
                    }
                     if(jobSeekerId!==null){
                        JobSeeker.update({_id : jobSeekerId},{
                                $set:{images:fileObj._id}
                            });
                        // this.jobSeeker.images.push(fileObj);
                    }    
         
                    this.cropImgSrc = undefined;
                    this.myCroppedImage = '';
                  });
                }
              };
            
            this.DeleteImage = (id,jobSeekerId) => {
                if (jobSeekerId !== null) {
                    JobSeeker.update({_id : jobSeekerId},{
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