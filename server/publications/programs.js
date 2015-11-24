Meteor.publish('programs', (userId) => {
  check(userId, String);
  return Programs.find({
    userId: userId
  });
});
