StartingPointEntry = React.createClass({
	mixins: [ReactMeteorData],
	getInitialState() {
		let current = FlowRouter.current().params;
		let date = `${current.day}/${current.month}/${current.year}`;
		let momentObj = moment(date, 'DD/MM/YYYY');
		return {
			date: momentObj,
			dateString: date,
			time: current.time,
			newEntry: current.entryId ? false : true,
			entryId: current.entryId,
		};
	},
	getMeteorData() {
		let uid = Meteor.userId();
		let subscription = Meteor.subscribe('exercises', uid, 'depression');
		Meteor.subscribe('programs', uid); // Needed for updateExercise

		let exercise = {};
		let entry = {};

		if (subscription.ready()) {
			exercise = Exercises.findOne({
				userId: uid,
				route: 'starting-point'
			});

			// If editing
			if (!this.state.newEntry) {
				entry = this.getEntry(exercise);
			}
		}

		return {
			isLoading: !subscription.ready(),
			userId: uid,
			exercise: exercise,
			entry: entry
		};
	},
	getEntry(exercise) {
		return _.find(exercise.exerciseData[this.state.dateString][this.state.time], (obj) => {
			return obj.entryId === parseInt(this.state.entryId);
		});
	},
	getDate() {
		let date = this.state.date;
		return {
			day: date.get('date'),
			month: date.get('month')+1,
			year: date.get('year')
		};
	},
	getPath() {
		return FlowRouter.path('starting-point', this.getDate());
	},
	handleSubmit(event) {
		event.preventDefault();

		let exercise = this.data.exercise;
		let date = this.state.dateString;
		let entry = this.data.entry;

		// If there is no data for this date, set it up
		if (!exercise.exerciseData[date]) {
			exercise.exerciseData[date] = {
				morning: [],
				afternoon: [],
				evening: [],
				comments: ''
			};
		}

		let entries = exercise.exerciseData[date][this.state.time];

		if (this.state.newEntry) {
			entries.push({
				entryId: entries.length + 1,
				what: event.target.what.value,
				where: event.target.where.value,
				who: event.target.who.value
			});
		} else {
			entry.what = event.target.what.value;
			entry.where = event.target.where.value;
			entry.who = event.target.who.value;
		}

		let exerciseProps = {
			userId: this.data.userId,
			exerciseData: exercise.exerciseData
		};

		Meteor.call('updateExercise', exercise._id, exerciseProps, (err, data) => {
			if (!err) {
				let successText = this.state.newEntry ? 'Entry added successfully' : 'Entry saved successfully';
				Bert.alert(successText, 'success', 'growl-top-right');

				let program = Programs.findOne({
					userId: this.data.userId,
					route: 'depression'
				});

				Meteor.call('updateProgramLastCompleted', program._id);

				FlowRouter.go(this.getPath());
			} else {
				Bert.alert('There was an error submiting your entry', 'danger', 'growl-top-right');
				console.log(err);
			}
		});
	},
	newOrEdit() {
		return this.state.newEntry ? 'New' : 'Edit';
	},
	render() {
		if (this.data.isLoading) {
			return <Loading />;
		} else if (!PermissionHelpers.enrolled) {
			return <NotFound />;
		} else {
			return (
				<div>
					<ol className="breadcrumb">
						<li><a href={FlowHelpers.pathFor('index')}>Dashboard</a></li>
						<li><a href={FlowHelpers.pathFor('depression')}>Depression</a></li>
						<li><a href={FlowHelpers.pathFor('starting-point')}>Starting Point</a></li>
						<li>{this.newOrEdit()}</li>
					</ol>

					<h3>Get Active, Feel Good Depression Program</h3>

					<h4>
						Exercise Three - Starting point: {this.newOrEdit()} entry{' '}
						<small>
							<a href="#" data-toggle="modal" data-target="#modal">
								<span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
							</a>
						</small>
					</h4>

					<hr />

					<form onSubmit={this.handleSubmit}>
						<div className="row">
							<div className="col-md-4">
								<div className="alert alert-success" role="alert">
									<p>
										<span className="glyphicon glyphicon-calendar" aria-hidden="true"></span>{' '}
										{this.newOrEdit()} entry for {FormattingHelpers.dateFromNow(this.state.date)}
									</p>
								</div>
							</div>

							<div className="col-md-8">
								<div className="alert alert-info" role="alert">
									<p>Don't worry if you can't fill in all of the boxes, you can come back and edit entries anytime.</p>
								</div>
							</div>

							<div className="col-md-4">
								<div className="form-group">
									<label htmlFor="what">What?</label>
									<textarea className="form-control" id="what" rows="4" placeholder="What did you do?" defaultValue={this.data.entry.what}></textarea>
								</div>
							</div>

							<div className="col-md-4">
								<div className="form-group">
									<label htmlFor="where">Where?</label>
									<textarea className="form-control" id="where" rows="4" placeholder="Where were you when you did it?" defaultValue={this.data.entry.where}></textarea>
								</div>
							</div>

							<div className="col-md-4">
								<div className="form-group">
									<label htmlFor="who">Who?</label>
									<textarea className="form-control" id="who" rows="4" placeholder="Who were you with when you did it?" defaultValue={this.data.entry.who}></textarea>
								</div>
							</div>

							<div className="col-md-12">
								<button type="submit" className="btn btn-primary pull-right">Save</button>
								<a href={this.getPath()} className="btn btn-default pull-right" style={{marginRight: '3px'}}>Cancel</a>
								<br /><br /><br />
							</div>
						</div>
					</form>
				</div>
			);
		}
	}
});
