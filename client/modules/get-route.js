let getRoute = () => {
	let pathname = FlowRouter.current().path;
	return pathname.split('/', 2)[1];
};

Modules.client.getRoute = getRoute
