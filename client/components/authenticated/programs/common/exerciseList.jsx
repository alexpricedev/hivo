ExerciseList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let uid = Meteor.userId();
		let subscription = Meteor.subscribe('exercises', uid, this.props.program);

		return {
			isLoading: !subscription.ready(),
			exercises: Exercises.find({
				userId: uid,
				program: this.props.program
			}).fetch().sort(function(a, b) {
				return a.order - b.order;
			})
		};
	},
  availibleExercises() {
		let unlocked = [];
		let locked = [];

		_.forEach(this.data.exercises, (exercise) => {
			if (exercise.complete) {
				unlocked.push(exercise);
			} else {
				locked.push(exercise);
			}
		});

		if (locked.length > 0) {
			unlocked.push(locked[0]);
			locked = _.drop(locked);
		}

		return {
			unlocked: unlocked,
			locked: locked
		};
  },
	tbody() {
		let exercises = this.availibleExercises();
		let rows = [];
		let rowKey = 0;

		if (exercises.unlocked) {
			_.forEach(exercises.unlocked, function(exercise) {
				let cls = 'btn btn-block';
				cls = exercise.complete ? cls + ' btn-success' : cls + ' btn-primary';

				rows.push(
					<tr key={++rowKey}>
						<td>
							<a className={cls} href={FlowHelpers.pathFor(exercise.route)}>{exercise.title}</a>
						</td>
					</tr>
				);
			});
		}

		if (exercises.locked) {
			_.forEach(exercises.locked, function(exercise) {
				rows.push(
					<tr key={++rowKey}>
						<td>
							<div className="alert alert-danger" style={{textAlign: 'center', paddingTop: '6px', paddingBottom: '6px', marginBottom: '0'}}>
								<span className="glyphicon glyphicon-lock pull-left"></span>
								{exercise.title}
							</div>
						</td>
					</tr>
				);
			});
		}

		return (
			<tbody>
				{rows}
			</tbody>
		);
	},
	render() {
		return (
			<table className="table table-striped">
				<thead>
					<tr>
						<th>
							Exercises
							<span className="label label-danger label-square pull-right">Locked</span>
							<span className="label label-primary label-square pull-right">Next</span>
							<span className="label label-success label-square pull-right">Complete</span>
						</th>
					</tr>
				</thead>
				{this.tbody()}
			</table>
		);
	}
});

