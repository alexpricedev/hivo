Template.startingPointEdit.onCreated(function() {
	this.userId = Meteor.userId();
	this.program = Modules.client.getProgram();
	this.exercise = Modules.client.getExercise();

	this.day = FlowRouter.getParam('day');
	this.month = FlowRouter.getParam('month');
	this.year = FlowRouter.getParam('year');
	this.time  = FlowRouter.getParam('time');
	this.entryId  = FlowRouter.getParam('entryId');

	this.subscribe('programs', this.userId);
	this.subscribe('modals', this.exercise);
	this.subscribe('exercises', this.userId, this.program);
});

Template.startingPointEdit.onRendered(function() {

	let wait = () => {
		if (this.subscriptionsReady()){
			// This block gets the entry with this URL hash

		} else {
			setTimeout(wait, 100);
		}
	};
	wait();
});

Template.startingPointEdit.helpers({
	entry() {
		let self = Template.instance();

		let exercise = Exercises.findOne({
			userId: self.userId,
			route: self.exercise
		});

		let date = `${self.day}/${self.month}/${self.year}`;

		return _.find(exercise.exerciseData[date][self.time], (obj) => {
			return obj.entryId === parseInt(self.entryId);
		});
	},
	entryDate() {
		let self = Template.instance();
		return moment(`${self.day}/${self.month}/${self.year}`, 'DD/MM/YYYY').locale('en').calendar(null, {
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			nextWeek: 'dddd',
			lastDay: '[Yesterday]',
			lastWeek: '[Last] dddd'
		});
	}
});

Template.startingPointEdit.events({
	'submit form': (event) => {
		event.preventDefault();

		let self = Template.instance();

		let date = `${self.day}/${self.month}/${self.year}`;

		let exercise = Exercises.findOne({
			userId: self.userId,
			route: self.exercise
		});

		let exerciseData = _.find(exercise.exerciseData[date][self.time], (obj) => {
			return obj.entryId === parseInt(self.entryId);
		});

		exerciseData.what = event.target.what.value;
		exerciseData.where = event.target.where.value;
		exerciseData.who = event.target.who.value;

		let exerciseProps = {
			userId: self.userId,
			exerciseData: exercise.exerciseData
		};

		// n% complete..??
		Modules.client.updateExercise(exercise, exerciseProps, 20);
	}
});
