let authenticatedRedirect = () => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    FlowRouter.go('login');
  }
};

let authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [authenticatedRedirect]
});

let checkValidDate = (context, redirect) => {
	let p = context.params;
	if (!moment(`${p.day}-${p.month}-${p.year}`, 'DD-MM-YYYY').isValid()) {
		redirect('not-found');
	}
}

let checkValidTime = (context, redirect) => {
	let p = context.params;
	let options = ['morning', 'afternoon', 'evening'];
	if (!lodash.includes(options, p.time)) { redirect('not-found'); }
}

Modules.both.authenticatedRouteHelpers = {
	authenticatedRedirect: authenticatedRedirect,
	authenticatedRoutes: authenticatedRoutes
};
Modules.both.checkValidDate = checkValidDate;
Modules.both.checkValidTime = checkValidTime;
