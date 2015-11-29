Meteor.methods({
  updateExercise(_id, exercise) {
    check(_id, String);
    check(exercise, Exercises.simpleSchema());

		// TODO: figure out how to make this work
    // check(exercise.exerciseData, ImpactOfDepressionSchema);

    try {
      return Exercises.update(_id, {
        $set: exercise
      });
    } catch (exception) {
			Bert.alert('Error: Something went wrong!', 'danger', 'fixed-top', 'fa-exclamation-triangle');
      return exception;
    }
  }
});
