Meteor.methods({
  updateImpactOfDepression( _id, props ) {
    check( _id, String );
    check( props, ImpactOfDepression.simpleSchema() );

    try {
      var exerciseId = ImpactOfDepression.update( _id, {
        $set: props
      });
      return exerciseId;
    } catch( exception ) {
      return exception;
    }
  }
});
