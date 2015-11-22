Meteor.methods({
  enrollInGetActive: function( userId ) {
    check( userId, String );

    var e1 = ImpactOfDepression.insert({ userId: userId });

    var program = {
        userId: userId,
        exercises: [e1]
    }

    try {
      return GetActive.insert( program );
    } catch( exception ) {
      return exception;
    }
  }
});
