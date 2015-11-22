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

// TODO: Make programs more general
Template.registerHelper('isEnrolled', function(programPath) {
	// TODO: not sure about this...
  Template.instance().subscribe('programs', Meteor.userId());

	var programs = GetActive.find({
		userId: Meteor.userId()
	}).fetch();

	return programs.length > 0 ? true : false;
});
