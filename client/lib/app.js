/**
 * Created by Yasir on 1/15/2016.
 */
angular.module('socially', [
    'angular-meteor',
    'ui.router',
    'accounts.ui',
    'angularUtils.directives.dirPagination',
    'uiGmapgoogle-maps',
    'ui.bootstrap',
    'ngFileUpload',
    'ngImgCrop'
]);

function onReady() {
    angular.bootstrap(document, ['socially'], {
        strictDi: true
    });
}

if (Meteor.isCordova)
    angular.element(document).on("deviceready", onReady);
else
    angular.element(document).ready(onReady);