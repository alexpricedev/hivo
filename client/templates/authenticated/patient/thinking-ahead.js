Template.thinkingAhead.onCreated(function() {
	this.userId = Meteor.userId();
	this.program = Modules.client.getProgram();
	this.exercise = Modules.client.getExercise();

	this.subscribe('programs', this.userId);
	this.subscribe('modals', this.exercise);
	this.subscribe('exercises', this.userId, this.program);
});

Template.thinkingAhead.onRendered(function() {
	let wait = () => {
		if (this.subscriptionsReady()){
			let n = $('.goal').length;
			Session.set('goal-number', n);

			if (n) {
				Modules.client.initDatepicker();
			} else {
				Modules.client.addGoal();
			}

			Modules.client.showModalOnRender(this.exercise);
		} else {
			setTimeout(wait, 100);
		}
	};
	wait();
});

Template.thinkingAhead.helpers({
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
	},
	scoreOptions(selected) {
		let options =  [
			{ text: '0 - Not at all' },
			{ text: '1' },
			{ text: '2 - Occasionally' },
			{ text: '3' },
			{ text: '4 - Often' },
			{ text: '5' },
			{ text: '6 - Anytime' }
		];

		options[selected].selected = 'selected';

		return options;
	}
});

Template.thinkingAhead.events({
	'click .add-goal': () => {
			Modules.client.addGoal();
	},
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
