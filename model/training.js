Training = new Mongo.Collection('training');
Training.allow({
    insert:function(userId,training){
        return userId && training.owner===userId;
    },
    update: function(userId, training){
        if(Meteor.user().emails[0].address == "bdhoteljobs@gmail.com"){
            return true;
        }else{
        return userId && training.owner===userId;
        }
    },
    remove:function(userId, training){
        if(Meteor.user().emails[0].address == "bdhoteljobs@gmail.com"){
            return true;
        }else{
        return userId && training.owner===userId;
        }
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