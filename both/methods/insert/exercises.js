Meteor.methods({
  insertExercise(exercise) {
    check(exercise, Exercises.simpleSchema());

		// TODO: Figure out how to validate exercise data

    try {
      return Exercises.insert(exercise);
    } catch(exception) {
			Bert.alert('Error: Something went wrong!', 'danger', 'fixed-top', 'fa-exclamation-triangle');
      return exception;
    }
  }
});
