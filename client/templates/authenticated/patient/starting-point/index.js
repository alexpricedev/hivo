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
	wait();
});

Template.startingPoint.helpers({
	exerciseData() {
		let self = Template.instance();

		let exercise = Exercises.findOne({
			userId: self.userId,
			route: self.exercise
		});

		let date = Modules.client.getSimpleDate(self);
		let data = exercise.exerciseData[date] ? exercise.exerciseData[date] : null;

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

		return [
			{ name: 'morning', data: null, badge: null },
			{ name: 'afternoon', data: null, badge: null },
			{ name: 'evening', data: null, badge: null }
		];
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

		// only allow date navigation if completed first day
		if (exercise.complete) {
			// get previous and next dates
			let currentDate = Modules.client.getSimpleDate(Template.instance());
			let previous = moment(currentDate, 'DD/MM/YYYY').locale('en').subtract(1, 'days');
			let next = moment(currentDate, 'DD/MM/YYYY').locale('en').add(1, 'days');

			let previousParams = {
				day: previous.get('date'),
				month: previous.get('month')+1,
				year: next.get('year')};
			let nextParams = {
				day: next.get('date'),
				month: next.get('month')+1,
				year: next.get('year')};

			let previousPath = FlowRouter.path('starting-point', previousParams);
			let nextPath = FlowRouter.path('starting-point', nextParams);

			let paths = {
				previous: previousPath,
				next: nextPath
			};

			return paths;
		}

		return false;
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

		let userId = Template.instance().userId;

		let goals = [];

		$.each($('.goal'), function(i, value) {
			goals.push({
			  date: moment($(value).find(`#date${i}`).val(), 'Do MMMM YYYY', 'en').toDate(),
			  goal: $(value).find(`#goal${i}`).val(),
				score: $(value).find(`#score${i}`).val()
			});
		});

		let exerciseProps = {
			userId: userId,
			exerciseData: {
				goals: goals
			}
		};

		let exercise = Exercises.findOne({
			userId: userId,
			route: Template.instance().exercise
		});

		// 20% complete
		Modules.client.updateExercise(exercise, exerciseProps, 20);
	}
});
