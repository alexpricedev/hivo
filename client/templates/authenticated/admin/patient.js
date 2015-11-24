Template.adminPatientOverview.onCreated(() => {
  Template.instance().subscribe('patient', FlowRouter.current().params._id);
  Template.instance().subscribe('programs', FlowRouter.current().params._id);
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
			availiblePrograms.forEach((availibleProgram, n) => {
				if (enrolledProgram.route === availibleProgram.route) {
					delete availiblePrograms[n];
				}
			});
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
