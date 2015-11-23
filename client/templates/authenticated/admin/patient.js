Template.adminPatientOverview.onCreated(() => {
  Template.instance().subscribe('patient', FlowRouter.current().params._id);
  Template.instance().subscribe('programs', FlowRouter.current().params._id);
  Template.instance().subscribe('exercises', FlowRouter.current().params._id);
});

Template.adminPatientOverview.helpers({
  patient: function() {
    return Meteor.users.findOne({
      _id: FlowRouter.current().params._id
    });
  },
  programs: function() {
    return Programs.find({
      userId: FlowRouter.current().params._id
    }).fetch();
  }
});

Template.adminPatientOverview.events({
  'click .enroll': function(event) {
    event.preventDefault();

    Meteor.call(
			'enroll',
			FlowRouter.current().params._id,
			event.target.getAttribute('data-program')
		);

    Bert.alert('Enroll successful', 'success', 'growl-top-right');
  }
});
