const authenticatedRedirect = Modules.both.authenticatedRouteHelpers.authenticatedRedirect;
const authenticatedRoutes = Modules.both.authenticatedRouteHelpers.authenticatedRoutes;

// Admin routes

authenticatedRoutes.route('/', {
  name: 'index',
  action() {
		ReactLayout.render( Default, { yield: <Index /> } );
  }
});

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
