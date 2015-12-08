ThinkingAhead = React.createClass({
	mixins: [ReactMeteorData],
	getInitialState() {
		return {
			goals: []
		};
	},
	getMeteorData() {
		let uid = Meteor.userId();
		let subscription = Meteor.subscribe('exercises', uid, 'depression');
		Meteor.subscribe('programs', uid); // Needed for updateExercise

		let exercise = {};
		let goals = [];

		if (subscription.ready()) {
			exercise = Exercises.findOne({
				userId: uid,
				route: 'thinking-ahead'
			});

			goals = this.getGoals(exercise);
		}

		return {
			isLoading: !subscription.ready(),
			userId: uid,
			exercise: exercise,
			goals: goals
		};
	},
	getGoals(exercise) {
		let data = exercise.exerciseData.goals;
		let goals = [];

		if (data) {
			_.forEach(data, (goal, i) => {
				goals.push({
					key: i,
					index: i,
					date: new Date(goal.date),
					goal: goal.goal,
					score: goal.score
				});
			});
		}

		return goals;
	},
	addGoal(event) {
		if (event) {event.preventDefault();}

		let state = _.clone(this.state);
		let index = state.goals.length + this.data.goals.length;

		let defaultProps = {
			key: index,
			index: index,
			date: new Date(),
			goal: '',
			score: 0
		};

		state.goals.push(defaultProps);
		this.setState(state);
	},
	handleSubmit(event) {
		event.preventDefault();

		let goals = [];

		$.each($(event.target).find('.goal'), function(i, value) {
			goals.push({
				date: moment($(value).find(`#date${i}`).val(), 'Do MMMM YYYY', 'en').toDate(),
				goal: $(value).find(`#goal${i}`).val(),
				score: $(value).find(`#score${i}`).val()
			});
		});

		let exerciseProps = {
			userId: this.data.userId,
			exerciseData: {
				goals: goals
			}
		};

		// 20% complete
		Modules.client.updateExercise(this.data.exercise, exerciseProps, 20);
	},
	render() {
		if (this.data.isLoading) {
			return <Loading />;
		} else if (!PermissionHelpers.enrolled) {
			return <NotFound />;
		} else {
			return (
				<div>
					<Breadcrumb links={[
						{link: 'index', text: 'Dashboard'},
						{link: 'depression', text: 'Depression'},
						{link: null, text: 'Thinking Ahead'}
					]} />

					<h3>Mentality Depression Program</h3>

					<h4>
						Exercise Two - Thinking ahead{' '}
						<small>
							<a href="#" data-toggle="modal" data-target="#modal">
								<span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
							</a>
						</small>
					</h4>

					<hr />

					<div className="alert alert-info" role="alert">
						Use this page to list what you want to achive from this program.
						Don't worry if you can't think of many, you can come back and add
						new goals in the future.
					</div>

					<form onSubmit={this.handleSubmit}>
						<div className="row goals">

							{this.data.goals.map(function(goal) {
								return (
									<ThinkingAheadGoal {...goal} />
								);
							})}
							{this.state.goals.map(function(goal) {
								return (
									<ThinkingAheadGoal {...goal} />
								);
							})}

							<div className="col-md-6 button-row">
								<a className="btn btn-block btn-lg btn-warning add-goal" onClick={this.addGoal}>
									Add goal{' '}
									<span className="glyphicon glyphicon-plus" style={{fontSize: '12px'}} aria-hidden="true"></span>
								</a>
							</div>
							<div className="col-md-12">
								<button type="submit" className="btn btn-primary pull-right">Save</button>
								<br /><br /><br />
							</div>
						</div>
					</form>
				</div>
			);
		}
	}
});

