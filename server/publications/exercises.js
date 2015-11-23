Meteor.publish('exercises', function(userId, program) {
  check(userId, String);
  check(program, String);

  return Exercises.find({
    userId: userId,
		program: program
  });
});
