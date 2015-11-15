Template.index.onCreated( () => {
  Template.instance().subscribe( 'template' );
  Template.instance().subscribe( 'patients' );
});

Template.index.helpers({
  patients: function() {
    return Meteor.users.find({'profile.counsellor._id': Meteor.userId()});
  }
});
