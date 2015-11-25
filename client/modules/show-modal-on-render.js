let showModalOnRender = (route) => {
	let exercise = Exercises.findOne({
		userId: Meteor.userId(),
		route: route
	});

	if (!exercise.complete) {
		$('#modal').modal('show');
	}
};

Modules.client.showModalOnRender = showModalOnRender;
