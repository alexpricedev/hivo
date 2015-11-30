Template.startingPoint.onCreated(function() {
	this.userId = Meteor.userId();
	this.program = Modules.client.getProgram();
	this.exercise = Modules.client.getExercise();

	this.day = new ReactiveVar(FlowRouter.getParam('day'));
	this.month = new ReactiveVar(FlowRouter.getParam('month'));
	this.year = new ReactiveVar(FlowRouter.getParam('year'));

	// Watch for changes in URL state
	Tracker.autorun(() => {
		FlowRouter.watchPathChange();
		let context = FlowRouter.current();
		this.day.set(context.params.day);
		this.month.set(context.params.month);
		this.year.set(context.params.year);
	});

	this.subscribe('programs', this.userId);
	this.subscribe('modals', this.exercise);
	this.subscribe('exercises', this.userId, this.program);
});

Template.startingPoint.onRendered(function() {
	let wait = () => {
		if (this.subscriptionsReady()) {
			Modules.client.showModalOnRender(this.exercise);
		} else {
			setTimeout(wait, 100);
		}
	};
	// wait();
});

Template.startingPoint.helpers({
	exerciseData() {
		let self = Template.instance();

		let exercise = Exercises.findOne({
			userId: self.userId,
			route: self.exercise
		});

		let date = Modules.client.getSimpleDate(self);

		if (exercise.exerciseData) {
			let data = _.has(exercise.exerciseData, date) ? exercise.exerciseData[date] : null;

			if (data) {
				return [{
					name: 'morning',
					data: data.morning,
					badge: Modules.client.getBadge(data.morning)
				}, {
					name: 'afternoon',
					data: data.afternoon,
					badge: Modules.client.getBadge(data.afternoon)
				}, {
					name: 'evening',
					data: data.evening,
					badge: Modules.client.getBadge(data.evening)
				}];
			}
		}

		return [
			{ name: 'morning', data: null, badge: Modules.client.getBadge([]) },
			{ name: 'afternoon', data: null, badge: Modules.client.getBadge([]) },
			{ name: 'evening', data: null, badge: Modules.client.getBadge([]) }
		];
	},
	comments() {
		let self = Template.instance();

		let exercise = Exercises.findOne({
			userId: self.userId,
			route: self.exercise
		});

		let date = Modules.client.getSimpleDate(self);

		console.log(date);

		if (!exercise.exerciseData) {
			return null;
		}

		return exercise.exerciseData[date] ? exercise.exerciseData[date].comments : null;
	},
	exerciseIntroduction() {
		return Modals.findOne({
			slug: Template.instance().exercise
		});
	},
	pages() {
		let exercise = Exercises.findOne({
			userId: Template.instance().userId,
			route: Template.instance().exercise
		});

		// get previous and next dates
		let currentDate = Modules.client.getSimpleDate(Template.instance());
		let previous = moment(currentDate, 'DD/MM/YYYY').locale('en')
																										.subtract(1, 'days');
		let next = moment(currentDate, 'DD/MM/YYYY').locale('en')
																								.add(1, 'days');

		let previousParams = {
			day: previous.get('date'),
			month: previous.get('month')+1,
			year: next.get('year')
		};
		let nextParams = {
			day: next.get('date'),
			month: next.get('month')+1,
			year: next.get('year')
		};

		let previousPath = FlowRouter.path('starting-point', previousParams);
		let nextPath = FlowRouter.path('starting-point', nextParams);

		let paths = {
			previous: previousPath,
			next: nextPath
		};

		return paths;
	},
	currentDate() {
		let self = Template.instance();
		let date = new Date();

		let day = self.day.get() ? self.day.get() : date.getDate(),
				month = self.month.get() ? self.month.get() : date.getMonth()+1,
				year = self.year.get() ? self.year.get(): date.getFullYear();

		let string = `${day}/${month}/${year}`;
		let momentObj = moment(string, 'DD/MM/YYYY');

		return {
			day: day,
			month: month,
			year: year,
			string: string,
			moment: momentObj,
			fromNow: Modules.client.getDateFromNow(momentObj)
		};
	}
});

Template.startingPoint.events({
	'submit form': (event) => {
		event.preventDefault();

		let self = Template.instance();
		let date = Modules.client.getSimpleDate(self);

		let exercise = Exercises.findOne({
			userId: self.userId,
			route: self.exercise
		});

		if (!exercise.exerciseData) {
			exercise.exerciseData = {}
		}

		// If no entries for today, set them up
		if (!exercise.exerciseData[date]) {
			exercise.exerciseData[date] = {
				morning: [],
				afternoon: [],
				evening: [],
				comments: ''
			};
		}

		exercise.exerciseData[date].comments = event.target.comments.value;

		let exerciseProps = {
			userId: self.userId,
			exerciseData: exercise.exerciseData
		};

		Meteor.call('updateExercise', exercise._id, exerciseProps);
		Bert.alert('Comments saved successfully', 'success', 'growl-top-right');

		let program = Programs.findOne({
			userId: self.userId,
			route: self.program
		});

		Meteor.call('updateProgramLastCompleted', program._id);
	}
});
