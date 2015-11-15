Template.registerHelper('getFullName', function(user) {
  return user.profile.name.first + ' ' + user.profile.name.last;
});

Template.registerHelper('userEmail', function(user) {
  return user.emails[0].address;
});

Template.registerHelper('formatDate', function(date) {
  if (date) {
      return moment(date).fromNow();
  } else {
      return 'Never';
  }
});

Template.registerHelper('onlineStatus', function(user) {
  return status ? 'glyphicon-ok' : 'glyphicon-remove';
});
