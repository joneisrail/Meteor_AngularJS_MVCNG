/**
 * Created by Yasir on 1/20/2016.
 */
Meteor.publish('training', function(options, searchString){
    if(!searchString || searchString==null){
        searchString='';
    }
    let selector = {
        heading: { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' }
    }

    Counts.publish(this, 'numberOfTraining', Training.find(selector), {noReady: true});

    return Training.find(selector, options);

});