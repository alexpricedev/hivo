Template.startingPointNew.onCreated(function() {
	this.userId = Meteor.userId();
	this.program = Modules.client.getProgram();
	this.exercise = Modules.client.getExercise();
/*
 *  this.page = new ReactiveVar();
 *
 *  this.autorun(() => {
 *    this.page.set(parseInt(FlowRouter.getQueryParam('page')));
 *  });
 */

	this.subscribe('programs', this.userId);
	this.subscribe('modals', this.exercise);
	this.subscribe('exercises', this.userId, this.program);
});

Template.startingPointNew.onRendered(function() {
	// TODO: make module
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
	timeOfDay() {
		return Modules.both.capitalizeFirstLetter(
			FlowRouter.getParam('time')
		);
	},
	exerciseIntroduction() {
		return Modals.findOne({
			slug: Template.instance().exercise
		});
	}
/*
 *  currentPage() {
 *    let page = Template.instance().page.get();
 *
 *    if (page) {
 *      switch(page) {
 *        case 1:
 *          return 'Today';
 *          break;
 *        case 2:
 *          return 'Tomorrow';
 *          break;
 *        default:
 *          return moment(new Date()).add(page-1, 'days').format('dddd');
 *      }
 *    }
 *
 *    return 'Today';
 *  },
 */
/*
 *  previousPage() {
 *    let currentPage = Template.instance().page.get();
 *    let previousPage = null;
 *
 *    if (currentPage && currentPage > 1 && currentPage <= 7) {
 *      previousPage = currentPage - 1;
 *    }
 *
 *    return previousPage;
 *  },
 *  nextPage() {
 *    let currentPage = Template.instance().page.get();
 *    let nextPage = null;
 *
 *    if (currentPage && currentPage > 0 && currentPage < 7) {
 *      nextPage = currentPage + 1;
 *    } else {
 *      nextPage = currentPage == 7 ? null : 2;
 *    }
 *
 *    return nextPage;
 *  }
 */
});

Template.startingPointNew.events({
	'submit form': (event) => {
		event.preventDefault();

		let userId = Template.instance().userId;

		let d = new Date();
		let simpleDate = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

		let exercise = Exercises.findOne({
			userId: userId,
			route: Template.instance().exercise
		});

		// If no entries for today, set them up
		if (!exercise.exerciseData[simpleDate]) {
			exercise.exerciseData[simpleDate] = {
				morning: [],
				afternoon: [],
				evening: []
			};
		}

		let time = exercise.exerciseData[simpleDate][FlowRouter.getParam('time')];
		let entryId  = time.length + 1;

		time.push({
			entryId: entryId,
			what: event.target.what.value,
			where: event.target.where.value,
			who: event.target.who.value
		});

		let exerciseProps = {
			userId: userId,
			exerciseData: exercise.exerciseData
		};

		// n% complete..??
		Modules.client.updateExercise(exercise, exerciseProps, 20);
	}
});
