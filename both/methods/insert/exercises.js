Meteor.methods({
  insertExercise(exercise) {
		exercise.exerciseData = {};
    check(exercise, Exercises.simpleSchema());

    try {
      return Exercises.insert(exercise);
    } catch(exception) {
			Bert.alert('Error: Something went wrong!', 'danger', 'fixed-top', 'fa-exclamation-triangle');
      return exception;
    }
  }
});
