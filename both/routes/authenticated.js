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

authenticatedRoutes.route('/depression/thinking-ahead', {
  name: 'thinking-ahead',
  action() {
    BlazeLayout.render('default', {
      yield: 'thinkingAhead',
      footer: 'footer'
    });
  }
});

authenticatedRoutes.route('/depression/starting-point', {
  name: 'starting-point',
  action() {
    BlazeLayout.render('default', {
      yield: 'startingPoint',
      footer: 'footer'
    });
  }
});

authenticatedRoutes.route('/depression/starting-point/new/:time', {
  name: 'starting-point-new',
	triggersEnter: [function(context, redirect) {
		let options = ['morning', 'afternoon', 'evening'];
		if(!lodash.includes(options, context.params.time)) {
			redirect('not-found');
		}
	}],
  action() {
    BlazeLayout.render('default', {
      yield: 'startingPointNew',
      footer: 'footer'
    });
  }
});

authenticatedRoutes.route('/depression/starting-point/edit/:day/:month/:year/:time/:entryId', {
  name: 'starting-point-edit',
	triggersEnter: [function(context, redirect) {
		let p = context.params;
		let options = ['morning', 'afternoon', 'evening'];
		if (!lodash.includes(options, p.time)) { redirect('not-found'); }
		if (!moment(`${p.day}-${p.month}-${p.year}`, 'DD-MM-YYYY').isValid()) {
			redirect('not-found');
		}
	}],
  action() {
    BlazeLayout.render('default', {
      yield: 'startingPointEdit',
      footer: 'footer'
    });
  }
});
