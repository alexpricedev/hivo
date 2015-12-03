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
	currentDate() {
		let self = Template.instance();
		return {
			day: self.day,
			month: self.month,
			year: self.year
		};
	},
	fromNow() {
		let self = Template.instance();
		let date = `${self.day}/${self.month}/${self.year}`;
		let momentObj = moment(date, 'DD/MM/YYYY');
		return Modules.client.getDateFromNow(momentObj).toLowerCase();
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

		Meteor.call('updateExercise', exercise._id, exerciseProps);
		Bert.alert('Entry updated successfully', 'success', 'growl-top-right');

		let program = Programs.findOne({
			userId: self.userId,
			route: self.program
		});

		Meteor.call('updateProgramLastCompleted', program._id);

		FlowRouter.go(
			'starting-point',
			{day: self.day, month: self.month, year: self.year}
		);
	}
});
