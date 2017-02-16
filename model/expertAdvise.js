ExpertAdvise = new Mongo.Collection('expertAdvise');
ExpertAdvise.allow({
    insert:function(userId,expertAdvise){
        return userId && expertAdvise.owner===userId;
    },
    update: function(userId, expertAdvise){
        
        return userId && expertAdvise.owner===userId;
        
    },
    remove:function(userId, expertAdvise){
       if(Meteor.user().emails[0].address == "bdhoteljobs@gmail.com"){
            return true;
        }else{
        return userId && expertAdvise.owner===userId;
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