let updateExercise = (exercise, props, percent, customRouting) => {
	Meteor.call('updateExercise', exercise._id, props);
	Bert.alert('Update successful', 'success', 'growl-top-right');

	let programRoute = Modules.client.getProgram();

	let program = Programs.findOne({
		userId: Meteor.userId(),
		route: programRoute
	});

	Meteor.call('updateProgramLastCompleted', program._id);
	Meteor.call('updateProgramProgress', program._id, percent);

	if (!customRouting) {
		FlowRouter.go(programRoute);
	}
};

Modules.client.updateExercise = updateExercise;