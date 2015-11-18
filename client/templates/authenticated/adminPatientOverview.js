Template.adminPatientOverview.onCreated( () => {
  Template.instance().subscribe( 'template' );
  Template.instance().subscribe( 'patient', FlowRouter.current().params._id );
});

Template.adminPatientOverview.helpers({
  patient: function() {
    return Meteor.users.findOne({_id: FlowRouter.current().params._id});
  }
});
