Meteor.publish('company', function(options, searchString){
    if(!searchString || searchString==null){
        searchString='';
    }
    let selector = {
        companyName: { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' }
    }

    Counts.publish(this, 'numberOfCompany', Company.find(selector), {noReady: true});

    return Company.find(selector, options);

});