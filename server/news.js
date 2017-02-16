/**
 * Created by Yasir on 1/20/2016.
 */
Meteor.publish('news', function(options, searchString){
    if(!searchString || searchString==null){
        searchString='';
    }
    let selector = {
        heading: { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' }        
    }

    Counts.publish(this, 'numberOfNews', News.find(selector), {noReady: true});

    return News.find(selector, options);

});