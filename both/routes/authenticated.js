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

authenticatedRoutes.route('/get-active', {
  name: 'get-active',
  action() {
    BlazeLayout.render('default', {
      yield: 'getActive',
      footer: 'footer'
    });
  }
});

authenticatedRoutes.route('/get-active/impact-of-depression', {
  name: 'impact-of-depression',
  action() {
    BlazeLayout.render('default', {
      yield: 'impactOfDepression',
      footer: 'footer'
    });
  }
});

authenticatedRoutes.route('/get-active/thinking-ahead', {
  name: 'thinking-ahead',
  action() {
    BlazeLayout.render('default', {
      yield: 'thinkingAhead',
      footer: 'footer'
    });
  }
});

authenticatedRoutes.route('/get-active/starting-point', {
  name: 'starting-point',
  action() {
    BlazeLayout.render('default', {
      yield: 'startingPoint',
      footer: 'footer'
    });
  }
});

authenticatedRoutes.route('/get-active/starting-point/:day/:month/:year', {
  name: 'starting-point',
	triggersEnter: [Modules.both.checkValidDate],
  action() {
    BlazeLayout.render('default', {
      yield: 'startingPoint',
      footer: 'footer'
    });
  }
});

authenticatedRoutes.route('/get-active/starting-point/:day/:month/:year/new/:time', {
  name: 'starting-point-new',
	triggersEnter: [
		Modules.both.checkValidDate,
		Modules.both.checkValidTime
	],
  action() {
    BlazeLayout.render('default', {
      yield: 'startingPointNew',
      footer: 'footer'
    });
  }
});

authenticatedRoutes.route('/get-active/starting-point/:day/:month/:year/edit/:time/:entryId', {
  name: 'starting-point-edit',
	triggersEnter: [
		Modules.both.checkValidDate,
		Modules.both.checkValidTime
	],
  action() {
    BlazeLayout.render('default', {
      yield: 'startingPointEdit',
      footer: 'footer'
    });
  }
});
