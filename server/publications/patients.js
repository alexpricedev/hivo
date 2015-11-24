Meteor.publish('patients', (userId) => {
	check(userId, String);

  return Meteor.users.find({
    'profile.counsellor._id': userId
  }, {
    fields: {
      emails: 1,
      status: 1,
      'profile.name': 1,
      'profile.counsellor': 1,
      'profile.isAdmin': 1
    }
  });
});
