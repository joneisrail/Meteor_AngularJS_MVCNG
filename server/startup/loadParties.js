/**
 * Created by Yasir on 1/14/2016.
 */

  Meteor.startup( function(){
      if(Parties.find().count()===0){
          var parties=[
              {
                  name:'Dubstep party one',
                  description:'party one description'
              },
              {
                  name:'All dubstep party two',
                  description:'party two description'
              },
              {
                  name:'Savage party three',
                  description:'party three description'
              }
          ];
          for (var i=0; i < parties.length; i++){
              Parties.insert(parties[i]);
          }
      }
  });
