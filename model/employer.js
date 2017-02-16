/**
 * Created by Yasir on 1/15/2016.
 */
Employers = new Mongo.Collection('employer');
Employers.allow({
    insert:function(userId,employer){
        return userId && employer.owner===userId;
    },
    update: function(userId, employer){
        return true;//userId && employer.owner===userId;    
    },
    remove:function(userId, employer){
        if(Meteor.user().emails[0].address == "bdhoteljobs@gmail.com"){
            return true;
        }else{
            return userId && employer.owner===userId;
        }
    }

});
let getContactEmails = function (user) {
    if (user.emails && user.emails.length)
        return user.emails[0].address;

    if (user.services && user.services.facebook && user.services.facebook.email)
        return user.services.facebook.email;

    return null;
};
let getEmailByID = function (userId) {
    let user =Meteor.users.findOne(userId);
    if (user.emails && user.emails.length)
        return user.emails[0].address;

    if (user.services && user.services.facebook && user.services.facebook.email)
        return user.services.facebook.email;

    return null;
};
