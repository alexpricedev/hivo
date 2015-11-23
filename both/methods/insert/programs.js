Meteor.methods({
  enroll(userId, route) {
    check(userId, String);
    check(route, String);

		// TODO: check route is in programTitles
		// TODO: rename programTitles to something better

    let emptyExercise = { userId: userId };

		let exerciseOneId = Meteor.call(
			'insertImpactOfDepression',
			emptyExercise,
			route
		);

		let programTitles= {
			depression: 'Get Active, Feel Good - Depression'
		}

    let program = {
      userId: userId,
			title: programTitles[route],
			route: route,
      exercises: [exerciseOneId]
    }

    try {
      return Programs.insert(program);
    } catch (exception) {
      return exception;
    }
  }
});
