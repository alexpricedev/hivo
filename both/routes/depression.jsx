const authenticatedRedirect = Modules.both.authenticatedRouteHelpers.authenticatedRedirect;
const authenticatedRoutes = Modules.both.authenticatedRouteHelpers.authenticatedRoutes;

authenticatedRoutes.route('/depression', {
  name: 'depression',
  action() {
		ReactLayout.render(Default, {
			yield: <DepressionIndex />,
			footer: <Footer />
		});
  }
});

authenticatedRoutes.route('/depression/impact-of-depression', {
  name: 'impact-of-depression',
  action() {
		ReactLayout.render(Default, {
			yield: <ImpactOfDepression />,
			footer: <Footer />,
			modal: 'impact-of-depression'
		});
  }
});

authenticatedRoutes.route('/depression/thinking-ahead', {
  name: 'thinking-ahead',
  action() {
		ReactLayout.render(Default, {
			yield: <ThinkingAhead />,
			footer: <Footer />,
			modal: 'thinking-ahead'
		});
  }
});

authenticatedRoutes.route('/depression/starting-point', {
  name: 'starting-point',
  action() {
		ReactLayout.render(Default, {
			yield: <StartingPoint />,
			footer: <Footer />,
			modal: 'starting-point'
		});
  }
});

authenticatedRoutes.route('/depression/starting-point/:day/:month/:year', {
  name: 'starting-point',
	triggersEnter: [Modules.both.checkValidDate],
  action() {
		ReactLayout.render(Default, {
			yield: <StartingPoint />,
			footer: <Footer />
		});
  }
});

authenticatedRoutes.route('/depression/starting-point/:day/:month/:year/:time/:entryId?', {
  name: 'starting-point-entry',
	triggersEnter: [
		Modules.both.checkValidDate,
		Modules.both.checkValidTime
	],
  action() {
		ReactLayout.render(Default, {
			yield: <StartingPointEntry />,
			footer: <Footer />
		});
  }
});
