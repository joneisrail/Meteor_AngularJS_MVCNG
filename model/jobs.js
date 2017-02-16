/**
 * Created by Yasir on 1/15/2016.
 */
Jobs = new Mongo.Collection('jobs');
Jobs.allow({
    insert:function(userId,job){
        return userId && job.owner===userId;
    },
    update: function(userId, job){
       
        return true;// userId && job.owner===userId;
       
    },
    remove:function(userId, job){
        if(Meteor.user().emails[0].address == "bdhoteljobs@gmail.com"){
            return true;
        }else{
          return userId && job.owner===userId;
        }

    }
});

Meteor.methods({
  jobApply: function ( toMail, jobHeading, jobSeeker) {
    check([toMail], [String]);
    //let user = Users.findOne({_id:userId});
    //let jobSeeker=JobSeeker.findOne({owner:user._id});

    let text ="Dear Sir/Madam,\n\n With due respect I would like to present myself as a candidate for the position of '" 
                + jobHeading + "'. " +
                    "\n\n Please take a look at my resume through this link:"+
                    "\n http://www.bdhoteljobs.com/profileDetail/"+jobSeeker._id+
                    "\n\n I hope you would be kind enough to give me the opportunity for an interview to discuss in detail."+ 
                    "\n\n I am waiting for your positive response. \n\n Regards\n"+jobSeeker.name;
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: toMail,
      // from: from,
      subject: "-BDHotelJobs.com- Application for "+ jobHeading,
      text: text
    });
  }
});

let getEmailByID = function (userId) {
    let user =Meteor.users.findOne(userId);
    if (user.emails && user.emails.length)
        return user.emails[0].address;

    if (user.services && user.services.facebook && user.services.facebook.email)
        return user.services.facebook.email;

    return null;
};