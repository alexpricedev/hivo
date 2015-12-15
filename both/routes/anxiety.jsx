const authenticatedRedirect = Modules.both.authenticatedRouteHelpers.authenticatedRedirect;
const authenticatedRoutes = Modules.both.authenticatedRouteHelpers.authenticatedRoutes;

authenticatedRoutes.route('/anxiety', {
  name: 'anxiety',
  action() {
		ReactLayout.render(Default, {
			yield: <AnxietyIndex />
		});
  }
});

authenticatedRoutes.route('/anxiety/hierarchy', {
  name: 'anxiety-hierarchy',
  action() {
		ReactLayout.render(Default, {
			yield: <AnxietyHierarchy />
		});
  }
});
