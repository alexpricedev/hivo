Template.adminPatientOverview.onCreated( () => {
  Template.instance().subscribe( 'patient', FlowRouter.current().params._id );
  Template.instance().subscribe( 'programs', FlowRouter.current().params._id );
});

Template.adminPatientOverview.helpers({
  patient: function() {
    return Meteor.users.findOne({_id: FlowRouter.current().params._id});
  },
  programs: function() {
    return GetActive.find({ userId: FlowRouter.current().params._id }).fetch();
  }
});

Template.adminPatientOverview.events({
  'click .enroll': function(event) {
    event.preventDefault();

    Meteor.call('enrollInGetActive', FlowRouter.current().params._id)

    Bert.alert( 'Enroll successful', 'success', 'growl-top-right' );
  }
});
