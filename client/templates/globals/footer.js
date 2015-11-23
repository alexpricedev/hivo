Template.footer.onCreated( () => {
	Template.instance().subscribe('programs', Meteor.userId());
});

Template.footer.helpers({
	footerProgress: () => {
		let route = Modules.client.getRoute();

		let program = Programs.findOne({
			userId: Meteor.userId(),
			route: route
		});

		return program.progress;
	}
});
