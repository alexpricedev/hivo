Template.startingPoint.onCreated(function() {
	this.userId = Meteor.userId();
	this.program = Modules.client.getProgram();
	this.exercise = Modules.client.getExercise();
	this.page = new ReactiveVar();

	this.autorun(() => {
		this.page.set(parseInt(FlowRouter.getQueryParam('page')));
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
		let exercise = Exercises.findOne({
			userId: Template.instance().userId,
			route: Template.instance().exercise
		});

		let d = new Date();
		let simpleDate = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

		let data = exercise.exerciseData[simpleDate];
		return data ? data : null;
	},
	exerciseBadge(time) {
		// TODO: moduralise this
		let exercise = Exercises.findOne({
			userId: Template.instance().userId,
			route: Template.instance().exercise
		});

		let d = new Date();
		let simpleDate = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
		let exerciseData = exercise.exerciseData[simpleDate];

		let complete = 0;
		let cls = '';

		if (exerciseData) {
			let data = exerciseData[time];
			complete = data ? data.length : 0;

			switch(complete) {
				case 0:
					cls = 'alert-danger';
					break;
				case 1:
					cls = 'alert-info';
					break;
				default:
					cls = 'alert-success';
			}
		}

		return Spacebars.SafeString(
			`<span class="badge pull-right ${cls}">${complete} / 2</span>`
		);
	},
	exerciseIntroduction() {
		return Modals.findOne({
			slug: Template.instance().exercise
		});
	},
	currentPage() {
		let date = new Date();
		let day = FlowRouter.getParam('day') ? FlowRouter.getParam('day') : date.getDate(),
				month = FlowRouter.getParam('month') ? FlowRouter.getParam('month') : date.getMonth()+1,
				year = FlowRouter.getParam('year') ? FlowRouter.getParam('year') : date.getFullYear();

		return {
			day: day,
			month: month,
			year: year
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
