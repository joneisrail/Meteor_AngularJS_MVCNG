/**
 * Created by Yasir on 1/16/2016.
 */
Meteor.publish("users", function () {
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false}); 