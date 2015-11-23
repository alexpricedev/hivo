const authenticatedRedirect = () => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    FlowRouter.go('login');
  }
};

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [authenticatedRedirect]
});

// Admin routes

authenticatedRoutes.route('/', {
  name: 'index',
  action() {
    BlazeLayout.render('default', {
      yield: 'index'
    });
  }
});

authenticatedRoutes.route('/patient/new', {
  name: 'adminAddPatient',
  action() {
    BlazeLayout.render('default', {
      yield: 'adminAddPatient'
    });
  }
});

authenticatedRoutes.route('/patient/:_id', {
  name: 'adminPatientOverview',
  action(params) {
    BlazeLayout.render('default', {
      yield: 'adminPatientOverview'
    });
  }
});

// Patient routes

authenticatedRoutes.route('/depression', {
  name: 'depression',
  action() {
    BlazeLayout.render('default', {
      yield: 'depression',
      footer: 'footer'
    });
  }
});

authenticatedRoutes.route('/depression/impact-of-depression', {
  name: 'impact-of-depression',
  action() {
    BlazeLayout.render('default', {
      yield: 'impactOfDepression',
      footer: 'footer'
    });
  }
});
