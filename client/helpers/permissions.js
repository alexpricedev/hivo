let admin = () => {
  return Meteor.user().profile.isAdmin;
};

let enrolled = () => {
	let route = Modules.client.getProgram();

	let programs = Programs.findOne({
		userId: Meteor.userId(),
		route: route
	});

	return programs ? true : false;
};

PermissionHelpers = {
  admin: admin,
  enrolled: enrolled
};
