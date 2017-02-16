/**
 * Created by Yasir on 1/24/2016.
 */
Meteor.publish('jobSeeker', function(options,searchString){
    if(!searchString || searchString==null){
        searchString='';
    }
    let selector = {
        name: { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' }
    }

    Counts.publish(this, 'numberOfJobSeeker', JobSeeker.find(selector), {noReady: true});

    return JobSeeker.find(selector, options);

});

Meteor.publish('jobSeekers', function(options, selector){

    Counts.publish(this, 'numberOfJobSeeker', JobSeeker.find(selector), {noReady: true});

    return JobSeeker.find(selector, options);

});