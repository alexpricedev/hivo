Template.depression.onCreated(function() {
  this.subscribe('exercises', Meteor.userId(), 'depression');
});

Template.depression.helpers({
  exercises() {
    let exercises = Exercises.find({
      userId: Meteor.userId(),
			program: 'depression'
    }).fetch().sort(function(a, b) {
			return a.order - b.order;
		});

		let unlocked = [];
		let locked = [];

		_.forEach(
			exercises,
			function(exercise) {
				if (exercise.complete) {
					unlocked.push(exercise);
				} else {
					locked.push(exercise);
				}
			}
		);

		if (locked.length > 0) {
			unlocked.push(locked[0]);
			locked = _.drop(locked);
		}

		return {
			unlocked: unlocked,
			locked: locked
		};
  }
});
