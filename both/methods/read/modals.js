Meteor.methods({
  readModal( modalId ) {
    check( modalId, String );

    var modal = Modal.findOne( modalId );

    if ( !modal ) {
      throw new Meteor.Error( 'document-not-found', 'No modals found matching this query.' );
    }

    return modal;
  }
});
