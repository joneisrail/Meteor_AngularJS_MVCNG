/**
 * Created by Yasir on 1/16/2016.
 */
angular.module('socially').filter('displayName', function () {
    return function (user) {
        if (!user) {
            return '';
        }

        if (user.profile && user.profile.name) {
            return user.profile.name;
        }
        else if (user.emails) {
            return user.emails[0].address;
        }
        else {
            return user;
        }
    }
});

angular.module('socially').filter('displayJobLevel', function () {
    return function (id) {
        if (!id) {
            return '';
        }

        if (id==1) {
            return 'Entry Level';
        }
        else if (id==2) {
            return 'Mid Level';
        }
        else if(id==3) {
            return 'Management';
        }
    }
});

angular.module('socially').filter('displayJobType', function () {
    return function (id) {
        if (!id) {
            return '';
        }

        if (id==1) {
            return 'Full Time';
        }
        else if (id==2) {
            return 'Casual';
        }
        else if(id==3) {
            return 'Internship';
        }
    }
});

angular.module('socially').filter('displayJobCategory', function () {
    return function (id) {
        if (!id) {
            return '';
        }

       if (id==1) {
            return 'Management Position';
        }
        else if (id==2) {
            return 'Front Office';
        }
        else if(id==3) {
            return 'Food & Beverage Production';
        }else if(id==4) {
            return 'Food & Beverage Service';
        } else if(id==5) {
            return 'Sales & Marketing';
        } else if(id==6) {
            return 'Housekeeping';
        } else if(id==7) {
            return 'Safety & Security';
        }else if(id==8) {
            return 'HR & Admin';
        }else if(id==9) {
            return 'Accounts';
        }else if(id==10) {
            return 'Purchase & Store';
        }else if(id==11) {
            return 'Engineereing & Maintenance';
        }else if(id==12) {
            return 'Airline & Tourism';
        }else if(id==13) {
            return 'Foreign Jobs';
        }else if(id==14) {
            return 'Others';
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