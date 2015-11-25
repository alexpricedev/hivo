Meteor.methods({
  enroll(userId, route) {
    check(userId, String);
    check(route, String);

		let index = lodash.findIndex(
			Modules.both.availiblePrograms,
			{route: route}
		);

		// TODO: build program based on route

		if (index >= 0) {
			let emptyExercise = { userId: userId };

			let ex1 = Meteor.call(
				'insertImpactOfDepression',
				emptyExercise,
				route
			);

			let ex2 = Meteor.call(
				'insertThinkingAhead',
				emptyExercise,
				route
			);

			let program = lodash.clone(Modules.both.availiblePrograms[index]);
			program.userId = userId;
			program.exercises =[ex1, ex2];

			try {
				return Programs.insert(program);
			} catch (exception) {
				return exception;
			}
		}
  }
});
