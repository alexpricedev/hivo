Meteor.methods({
  removeModal( modalId ) {
    check( modalId, String );

    try {
      Modals.remove( modalId );
    } catch( exception ) {
      return exception;
    }
  }
});
