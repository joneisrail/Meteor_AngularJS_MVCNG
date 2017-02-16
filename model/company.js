Company = new Mongo.Collection('company');
Company.allow({
    insert:function(userId,com){
        return userId && com.owner===userId;
    },
    update: function(userId, com){
        if(getEmailByID(userId) == "bdhoteljobs@gmail.com"){
            return true;
        }else{
        return userId && com.owner===userId;
        }
    },
    remove:function(userId, com){
        if(Meteor.user().emails[0].address == "bdhoteljobs@gmail.com"){
            return true;
        }else{
        return userId && com.owner===userId;
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