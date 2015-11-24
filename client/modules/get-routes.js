let getProgram = () => {
	let pathname = FlowRouter.current().path;
	return pathname.split('/', 2)[1];
};

let getExercise = () => {
	let pathname = FlowRouter.current().path;
	return pathname.split('/', 3)[2];
};

Modules.client.getProgram = getProgram;
Modules.client.getExercise = getExercise;
