/**
 * Created by Yasir on 1/16/2016.
 */
angular.module('socially').filter('uninvited', function () {
    return function (users, party) {
        if (!party) {
            return false;
        }

        return _.filter(users, function (user) {
            return !(user._id == party.owner || _.contains(party.invited, user._id));
        });
    }
});