Template.adminIndex.onCreated( () => {
  Template.instance().subscribe( 'patients' );
});

Template.adminIndex.helpers({
  patients: function() {
    return Meteor.users.find({'profile.counsellor._id': Meteor.userId()});
  }
});
