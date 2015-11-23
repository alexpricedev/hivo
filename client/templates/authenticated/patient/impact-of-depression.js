Template.impactOfDepression.onCreated( () => {
	Template.instance().subscribe(
		'exercises',
		Meteor.userId(),
		Modules.client.getRoute()
	);
	Template.instance().subscribe('programs', Meteor.userId());
});

// TODO: Remove this
Template.impactOfDepression.onRendered(function() {
	if (!Session.get('depressionExerciseOneModalSeen')) {
		$('#modal').modal('show');
		Session.set('depressionExerciseOneModalSeen', true);
	}
});

Template.impactOfDepression.helpers({
	exercise: function() {
		var exercise = Exercises.findOne({ userId: Meteor.userId() });
		return exercise ? exercise : null;
	}
});

Template.impactOfDepression.events({
	'submit form': function(event) {
		event.preventDefault();

		let exerciseProps= {
			userId: Meteor.userId(),
			exerciseData: {
				behavioural: event.target.behavioural.value,
				thoughts: event.target.thoughts.value,
				physical: event.target.physical.value
			}
		};

		let exercise = Exercises.findOne({
			userId: Meteor.userId(),
			route: 'impact-of-depression'
		});

		Meteor.call('updateImpactOfDepression', exercise._id, exerciseProps);
		Bert.alert( 'Update successful', 'success', 'growl-top-right' );

		let programRoute = Modules.client.getRoute();

		// TODO: Look at storing the current program in a session var
		// TODO: Look at calling these from an update callback
		var program = Programs.findOne({
			userId: Meteor.userId(),
			route: programRoute
		});
		Meteor.call('updateProgramLastCompleted', program._id);
		Meteor.call('updateProgramProgress', program._id, 10);

		FlowRouter.go(programRoute);
	}
});
