Meteor.methods({
  insertThinkingAhead(exercise, program) {
    check(exercise, Exercises.simpleSchema());
    check(program, String);

		// TODO: Figure out how to validate exercise data

		// Definition of 'optional' fields
		exercise.title = 'What Do You Want to Get Out of Treatment?';
		exercise.route = 'thinking-ahead';
		exercise.program = program;

    try {
      return Exercises.insert(exercise);
    } catch(exception) {
			Bert.alert('Error: Something went wrong!', 'danger', 'fixed-top', 'fa-exclamation-triangle');
      return exception;
    }
  }
});
