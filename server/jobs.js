/**
 * Created by Yasir on 1/20/2016.
 */
Meteor.publish('jobs', function(options, searchString){
    if(!searchString || searchString==null){
        searchString='';
    }
    // let selector = {
    //     jobTitle: { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' }
    // }

    Counts.publish(this, 'numberOfJobs', Jobs.find(searchString), {noReady: true});

    return Jobs.find(searchString, options);

});

Meteor.publish('job', function(options, searchString){
    if(!searchString || searchString==null){
        searchString='';
    }
    let selector = {
        jobTitle: { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' }
    }

    Counts.publish(this, 'numberOfJobs', Jobs.find(selector), {noReady: true});

    return Jobs.find(selector, options);

});