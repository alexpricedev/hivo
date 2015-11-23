Template.registerHelper('isAdmin', function() {
  return Meteor.user().profile.isAdmin;
});

Template.registerHelper('getFullName', function(user) {
  return user.profile.name.first + ' ' + user.profile.name.last;
});

Template.registerHelper('getEmailAddress', function(user) {
  return user.emails[0].address;
});

Template.registerHelper('formatDate', function(date) {
  if (date) {
    return Spacebars.SafeString('<span class="label label-info">' + moment(date).fromNow() + '</span>');
  } else {
    return Spacebars.SafeString('<span class="label label-danger">Never</span>');
  }
});

Template.registerHelper('isEnrolled', () => {
	let route = Modules.client.getRoute();

	// TODO: not sure about this...
  Template.instance().subscribe('program', Meteor.userId(), route);

	var programs = Programs.findOne({
		userId: Meteor.userId(),
		route: route
	});

	return programs ? true : false;
});
