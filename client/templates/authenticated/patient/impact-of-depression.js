Template.impactOfDepression.onCreated(() => {
	let userId = Meteor.userId();

	Template.instance().subscribe(
		'exercises',
		userId,
		Modules.client.getProgram()
	);
	Template.instance().subscribe('programs', userId);
	Template.instance().subscribe('modals', 'impact-of-depression');
});

Template.impactOfDepression.onRendered(() => {
		if (true) {
			Meteor.setTimeout(function() {
				$('#modal').modal('show');
			}, 200)
		}
});

Template.impactOfDepression.helpers({
	exercise() {
		let exercise = Exercises.findOne({ userId: Meteor.userId() });
		return exercise ? exercise : null;
	},
	exerciseIntroduction() {
		return Modals.findOne({ slug: 'impact-of-depression' });
	}
});

Template.impactOfDepression.events({
	'submit form': (event) => {
		event.preventDefault();

		let exerciseProps = {
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
		Bert.alert('Update successful', 'success', 'growl-top-right');

		let programRoute = Modules.client.getProgram();

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
