Meteor.methods({
  insertImpactOfDepression(exercise, program) {
    check(exercise, Exercises.simpleSchema());
    check(program, String);

		// TODO: Figure out how to validate exercise data

		// Definition of 'optional' fields
		exercise.title = 'How Is Your Depression and Low Mood Affecting You';
		exercise.route = 'impact-of-depression';
		exercise.program = program;

    try {
      return Exercises.insert(exercise);
    } catch(exception) {
			Bert.alert('Error: Something went wrong!', 'danger', 'fixed-top', 'fa-exclamation-triangle');
      return exception;
    }
  }
});
