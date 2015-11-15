Template.patientProfile.onCreated( () => {
  Template.instance().subscribe( 'template' );
  Template.instance().subscribe( 'patients' );
});

Template.patientProfile.helpers({
  patient: function() {
    return Meteor.users.findOne({_id: FlowRouter.current().params._id});
  }
});
