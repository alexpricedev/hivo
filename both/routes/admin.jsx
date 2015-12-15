const authenticatedRedirect = Modules.both.authenticatedRouteHelpers.authenticatedRedirect;
const authenticatedRoutes = Modules.both.authenticatedRouteHelpers.authenticatedRoutes;

// Admin routes

authenticatedRoutes.route('/patients', {
	name: 'patients',
	action() {
		ReactLayout.render( Default, { yield: <Index /> } );
	}
});

// TEMP
authenticatedRoutes.route('/', {
  name: 'index',
  action() {
		ReactLayout.render(Default, {
			yield: <AnxietyHierarchy />
		});
  }
});
// TEMP

authenticatedRoutes.route('/patient/new', {
  name: 'adminAddPatient',
  action() {
		ReactLayout.render( Default, { yield: <AddPatient /> } );
  }
});

authenticatedRoutes.route('/patient/:_id', {
  name: 'adminPatientOverview',
  action() {
		ReactLayout.render( Default, { yield: <PatientOverview /> } );
  }
});
