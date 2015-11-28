Template.startingPointNew.onCreated(function() {
	this.userId = Meteor.userId();
	this.program = Modules.client.getProgram();
	this.exercise = Modules.client.getExercise();

	this.day = FlowRouter.getParam('day');
	this.month = FlowRouter.getParam('month');
	this.year = FlowRouter.getParam('year');
	this.time  = FlowRouter.getParam('time');

	this.subscribe('programs', this.userId);
	this.subscribe('modals', this.exercise);
	this.subscribe('exercises', this.userId, this.program);
});

Template.startingPointNew.onRendered(function() {
	let wait = () => {
		if (this.subscriptionsReady()){
			Modules.client.showModalOnRender(this.exercise);
		} else {
			setTimeout(wait, 100);
		}
	};
	// wait();
});

Template.startingPointNew.helpers({
	fromNow() {
		let self = Template.instance();
		let date = `${self.day}/${self.month}/${self.year}`;
		let momentObj = moment(date, 'DD/MM/YYYY');
		return Modules.client.getDateFromNow(momentObj).toLowerCase();
	},
	currentDate() {
		let self = Template.instance();
		return {
			day: self.day,
			month: self.month,
			year: self.year
		};
	},
	exerciseIntroduction() {
		return Modals.findOne({
			slug: Template.instance().exercise
		});
	}
});

Template.startingPointNew.events({
	'submit form': (event) => {
		event.preventDefault();

		let self = Template.instance();
		let date = `${self.day}/${self.month}/${self.year}`;

		let exercise = Exercises.findOne({
			userId: self.userId,
			route: self.exercise
		});

		// If no entries for today, set them up
		if (!exercise.exerciseData[date]) {
			exercise.exerciseData[date] = {
				morning: [],
				afternoon: [],
				evening: []
			};
		}

		let time = exercise.exerciseData[date][self.time];
		let entryId  = time.length + 1;

		time.push({
			entryId: entryId,
			what: event.target.what.value,
			where: event.target.where.value,
			who: event.target.who.value
		});

		let exerciseProps = {
			userId: self.userId,
			exerciseData: exercise.exerciseData
		};

		// n% complete..??
		Modules.client.updateExercise(exercise, exerciseProps, 20, true);
		FlowRouter.go('starting-point', {day: self.day, month: self.month, year: self.year});
	}
});
