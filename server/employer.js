/**
 * Created by Yasir on 1/20/2016.
 */
Meteor.publish('employer', function(options, searchString){
    if(!searchString || searchString==null){
        searchString='';
    }
    let selector = {
        companyName: { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' }
    }

    Counts.publish(this, 'numberOfEmployers', Employers.find(selector), {noReady: true});

    return Employers.find(selector, options);

});