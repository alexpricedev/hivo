Template.registerHelper('isAdmin', function() {
  return Meteor.user().profile.isAdmin;
});

Template.registerHelper('isEnrolled', () => {
	let route = Modules.client.getProgram();

	let programs = Programs.findOne({
		userId: Meteor.userId(),
		route: route
	});

	return programs ? true : false;
});
