Meteor.publish('programs', function(userId) {
  check(userId, String);

  return Programs.find({
    userId: userId
  });
});
