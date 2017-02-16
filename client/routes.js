/**
 * Created by Yasir on 1/15/2016.
 */
angular.module('socially')
    .config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home',{
                url:'/home',
                template:'<home></home>'
            })
            .state('about',{
                url:'/about-us',
                template:'<about></about>'
            })
            .state('contact',{
                url:'/contact-us',
                template:'<contact></contact>'
            })
            .state('admin',{
                url:'/admin',
                template:'<view-admin></view-admin>',
                 resolve:{
                    currentUser:($q) =>{
                    if(Meteor.user()!==null){
                        // let user =Meteor.users.findOne(userId);
                       if(Meteor.user().emails[0].address=="bdhoteljobs@gmail.com" || Meteor.user().emails[0].address=="joneisrail@gmail.com" )
                        {
                            return $q.resolve();
                        }else{
                            return $q.reject('AUTH_REQUIRED');
                        }
                                            
                    }else {
                        return $q.reject('AUTH_REQUIRED');
                        }
                    }
                }
            })
            .state('faq-jobseeker',{
                url:'/faq-jobseeker',
                template:'<faqjobseeker></faqjobseeker>'
            })
            .state('faq-employer',{
                url:'/faq-employer',
                template:'<faqemployer></faqemployer>'
            })
             .state('login', {
                url: '/login',
                template: '<login></login>'
              })
              .state('register', {
                url: '/register',
                template: '<register></register>'
              })
              .state('resetpw', {
                url: '/resetpw',
                template: '<resetpw></resetpw>'
              })
              .state('news',{
                url:'/news',
                template:'<new-list></new-list>'
            })
            .state('newsDetail',{
                url:'/news/:newsId',
                template:'<news-detail></news-detail>',
                resolve:{
                    currentUser:($q) =>{
                    if(Meteor.userId()==null){
            return $q.reject('AUTH_REQUIRED');
                }else {
                    return $q.resolve();
                    }
                }
                }
            })
            .state('promote',{
                url:'/promote',
                template:'<promote-list></promote-list>'
            })
            .state('expertAdvise',{
                url:'/expertAdvise',
                template:'<advise-list></advise-list>'
            })
            .state('expertAdviseDetail',{
                url:'/expertAdvise/:expertAdviseId',
                template:'<expert-advise-detail></expert-advise-detail>',
                resolve:{
                    currentUser:($q) =>{
                    if(Meteor.userId()==null){
            return $q.reject('AUTH_REQUIRED');
                }else {
                    return $q.resolve();
                    }
                }
                }
            })           
            .state('training',{
                url:'/training',
                template:'<training-schedule></training-schedule>'
            })
            .state('trainingDetail',{
                url:'/training/:trainingId',
                template:'<training-detail></training-detail>',
                resolve:{
                    currentUser:($q) =>{
                    if(Meteor.userId()==null){
            return $q.reject('AUTH_REQUIRED');
                }else {
                    return $q.resolve();
                    }
                }
                }
            })
            .state('image',{
                url:'/images',
                template:'<view-all-images></view-all-images>'
            })
            .state('parties',{
                url:'/parties',
                template:'<parties-list></parties-list>'
            })
            .state('partyDetails',{
                url:'/parties/:partyId',
                template:'<party-details></party-details>',
                resolve:{
                    currentUser:($q) =>{
                    if(Meteor.userId()==null){
            return $q.reject('AUTH_REQUIRED');
                }else {
                    return $q.resolve();
                    }
                }
                }
            })
            .state('jobs', {
                url: '/jobs',
                template: '<job-list></job-list>'
            })
            .state('joblist', {
                url: '/joblist/:cat',
                template: '<job-lists></job-lists>'
            })
             .state('alljob', {
                url: '/alljobs',
                template: '<view-all-job></view-all-job>',
                resolve: {
                    currentUser: ($q) => {
                    if(Meteor.userId() == null)
                    {
                        return $q.reject('AUTH_REQUIRED');
                    }
                    else
                    {
                        if(Meteor.user().emails[0].address=="bdhoteljobs@gmail.com"){
                            return $q.resolve();
                        }else
                        {
                            return $q.reject('AUTH_REQUIRED');   
                        }
                        
                    }
                    }
                }
            })
            .state('users', {
                url: '/users',
                template: '<user-list></user-list>'
            })

            .state('jobDetails', {
                url: '/jobs/:jobId',
                template: '<job-detail></job-detail>'
            })
        .state('employerList',{
            url:'/employerList',
            template:'<employer-list></employer-list>'
        })
        .state('employerProfile', {
            url: '/employer',
            template: '<employer-profile></employer-profile>',
            resolve: {
                    currentUser: ($q) => {
                    if(Meteor.userId() == null)
                    {
                        return $q.reject('AUTH_REQUIRED');
                    }
                    else
                    {
                        return $q.resolve();
                    }
                }
            }
        })

        .state('employerDetail', {
            url: '/employer/:employerId',
            template: '<employer-detail></employer-detail>',
            resolve: {
                currentUser: ($q) => {
                if(Meteor.userId() == null)
                {
                    return $q.reject('AUTH_REQUIRED');
                }
                else
                {
                    return $q.resolve();
                }
            }}
        })
        .state('jobSeekerDetail',{
            url:'/profileDetail/:jobSeekerId',
            template: '<job-seeker-detail></job-seeker-detail>'
            

            })
        .state('jobSeekerView',{
            url:'/profile/:jobSeekerId',
            template: '<job-seeker-view></job-seeker-view>',
            resolve: {
                currentUser: ($q) => {
                if(Meteor.userId() == null)
                {
                    return $q.reject('AUTH_REQUIRED');
                }
                else
                {
                    return $q.resolve();
                }
        }}

            });


        $urlRouterProvider.otherwise("/home");
    })
    .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error === 'AUTH_REQUIRED') {
                GAnalytics.pageview();
                $state.go('home');
            }else{
                GAnalytics.pageview();
            }
        });
    });
