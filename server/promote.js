/**
 * Created by Yasir on 1/20/2016.
 */
Meteor.publish('promote', function(options, searchString){
    if(!searchString || searchString==null){
        searchString='';
    }
    let selector = {
        heading: { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' }
    }

    Counts.publish(this, 'numberOfPromote', Promote.find(selector), {noReady: true});

    return Promote.find(selector, options);

});