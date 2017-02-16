News = new Mongo.Collection('news');
News.allow({
    insert:function(userId,news){
        return userId && news.owner===userId;
    },
    update: function(userId, news){
        if(Meteor.user().emails[0].address == "bdhoteljobs@gmail.com"){
            return true;
        }else{
        return userId && news.owner===userId;
        }
    },
    remove:function(userId, news){
        if(Meteor.user().emails[0].address == "bdhoteljobs@gmail.com"){
            return true;
        }else{
        return userId && news.owner===userId;
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