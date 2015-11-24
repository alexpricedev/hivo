Meteor.methods({
  enroll(userId, route) {
    check(userId, String);
    check(route, String);

		let index = lodash.findIndex(
			Modules.both.availiblePrograms,
			{route: route}
		);

		if (index >= 0) {
			let emptyExercise = { userId: userId };

			let exerciseOneId = Meteor.call(
				'insertImpactOfDepression',
				emptyExercise,
				route
			);

			let program = lodash.clone(Modules.both.availiblePrograms[index]);
			program.userId = userId;
			program.exercises =[exerciseOneId];

			try {
				return Programs.insert(program);
			} catch (exception) {
				return exception;
			}
		}
  }
});
