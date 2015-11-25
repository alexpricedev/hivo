Template.adminPatientOverview.onCreated(function() {
	let patientId = FlowRouter.current().params._id;
  this.subscribe('patient', patientId);
  this.subscribe('programs', patientId);
});

Template.adminPatientOverview.helpers({
  patient() {
    return Meteor.users.findOne({
      _id: FlowRouter.current().params._id
    });
  },
  programs() {
    return Programs.find({
      userId: FlowRouter.current().params._id
    }).fetch();
  },
  notEnrolled() {
		let availiblePrograms = _.clone(Modules.both.availiblePrograms);
    let enrolledPrograms = Programs.find({
      userId: FlowRouter.current().params._id
    }).fetch();

		enrolledPrograms.forEach((enrolledProgram) => {
			lodash.remove(
				availiblePrograms,
				function(availibleProgram) {
					return enrolledProgram.route === availibleProgram.route;
				}
			);
		});

		return availiblePrograms;
  }
});

Template.adminPatientOverview.events({
  'click .enroll'(event) {
    event.preventDefault();

    Meteor.call(
			'enroll',
			FlowRouter.current().params._id,
			event.target.getAttribute('data-program')
		);

    Bert.alert('Enroll successful', 'success', 'growl-top-right');
  }
});
