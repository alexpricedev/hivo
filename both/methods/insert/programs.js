Meteor.methods({
  enroll(userId, route) {
    check(userId, String);
    check(route, String);

		let index = lodash.findIndex(
			Modules.both.availiblePrograms,
			{route: route}
		);

		if (index >= 0) {
			let program = lodash.clone(Modules.both.availiblePrograms[index]);

			let exercises = [];

			lodash.forEach(program.exercises, function(exercise) {
				exercises.push(
					Meteor.call(
						'insertExercise',
						{
							userId: userId,
							title: exercise.title,
							route: exercise.route,
							order: exercise.order,
							program: route
						}
					)
				);
			});

			program.userId = userId;
			program.exercises = exercises;

			try {
				return Programs.insert(program);
			} catch (exception) {
				return exception;
			}
		}
  }
});
