/**
 * Created by Yasir on 1/24/2016.
 */
JobSeeker = new Mongo.Collection('jobSeeker');
JobSeeker.allow({
    insert:function(userId,jobSeeker){
        return userId && jobSeeker.owner===userId;
    },
    update: function(userId, jobSeeker){
        return true;//userId && jobSeeker.owner===userId;
    },
    remove:function(userId, jobSeeker){
       if(Meteor.user().emails[0].address == "bdhoteljobs@gmail.com"){
            return true;
        }else{
        return userId && jobSeeker.owner===userId;      
      }
    }

});

Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
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