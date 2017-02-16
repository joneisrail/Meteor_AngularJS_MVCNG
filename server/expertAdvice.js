Meteor.publish('expertAdvise', function(options, searchString){
    if(!searchString || searchString==null){
        searchString='';
    }
    let selector = {
        heading: { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' }
    }

    Counts.publish(this, 'numberOfExpertAdvise', ExpertAdvise.find(selector), {noReady: true});

    return ExpertAdvise.find(selector, options);

});