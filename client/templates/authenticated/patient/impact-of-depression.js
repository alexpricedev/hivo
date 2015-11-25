Template.impactOfDepression.onCreated(function() {
	this.userId = Meteor.userId();
	this.program = Modules.client.getProgram();
	this.exercise = Modules.client.getExercise();

	this.subscribe('programs', this.userId);
	this.subscribe('modals', this.exercise);
	this.subscribe('exercises', this.userId, this.program);
});

Template.impactOfDepression.onRendered(function() {
	let wait = () => {
		if (this.subscriptionsReady()){
			Modules.client.showModalOnRender(this.exercise);
		} else {
			setTimeout(wait, 100);
		}
	};
	wait();
});

Template.impactOfDepression.helpers({
	exercise() {
		let exercise = Exercises.findOne({
			userId: Template.instance().userId,
			route: Template.instance().exercise
		});
		return exercise ? exercise : null;
	},
	exerciseIntroduction() {
		return Modals.findOne({
			slug: Template.instance().exercise
		});
	}
});

Template.impactOfDepression.events({
	'submit form': (event) => {
		event.preventDefault();

		let userId = Template.instance().userId;

		let exerciseProps = {
			userId: userId,
			exerciseData: {
				behavioural: event.target.behavioural.value,
				thoughts: event.target.thoughts.value,
				physical: event.target.physical.value
			}
		};

		let exercise = Exercises.findOne({
			userId: userId,
			route: Template.instance().exercise
		});

		// 10% complete
		Modules.client.updateExercise(exercise, exerciseProps, 10);
	}
});
