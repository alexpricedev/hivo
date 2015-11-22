Meteor.methods({
  insertImpactOfDepression: function( exercise ) {
    check( exercise, ImpactOfDepression.simpleSchema() );

    try {
      return ImpactOfDepression.insert( exercise );
    } catch( exception ) {
      return exception;
    }
  }
});
