Promote = new Mongo.Collection('promote');
Promote.allow({
    insert:function(userId,promte){
        return userId && promte.owner===userId;
    },
    update: function(userId, promte){
        if(Meteor.user().emails[0].address == "bdhoteljobs@gmail.com"){
            return true;
        }else{
        return userId && promte.owner===userId;
        }
    },
    remove:function(userId, promte){
        if(Meteor.user().emails[0].address == "bdhoteljobs@gmail.com"){
            return true;
        }else{
        return userId && promte.owner===userId;
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