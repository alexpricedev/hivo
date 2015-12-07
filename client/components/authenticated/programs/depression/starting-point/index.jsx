 StartingPoint = React.createClass({
	mixins: [ReactMeteorData],
	getInitialState() {
		let current = FlowRouter.current().params;
		let date, momentObj;
		if (current.day && current.month && current.year) {
			date = `${current.day}/${current.month}/${current.year}`;
			momentObj = moment(date, 'DD/MM/YYYY');
		} else {
			momentObj = moment();
			date = this.getDateString(momentObj);
		}
		return {
			date: momentObj,
			dateString: date
		};
	},
	getMeteorData() {
		let uid = Meteor.userId();
		let subscription = Meteor.subscribe('exercises', uid, 'depression');
		Meteor.subscribe('programs', uid); // Needed for updateExercise

		let exercise = {};
		let exerciseData = {};

		if (subscription.ready()) {
			exercise = Exercises.findOne({
				userId: uid,
				route: 'starting-point'
			});

			exerciseData = exercise.exerciseData[this.state.dateString];
		}

		return {
			isLoading: !subscription.ready(),
			userId: uid,
			exercise: exercise,
			exerciseData: exerciseData,
			times: ['morning', 'afternoon', 'evening']
		};
	},
	getDate() {
		let date = this.state.date;
		return {
			day: date.get('date'),
			month: date.get('month')+1,
			year: date.get('year')
		};
	},
	getDateString(momentObj) {
		return `${momentObj.get('date')}/${momentObj.get('month')+1}/${momentObj.get('year')}`;
	},
	getNewEntryPath(time) {
		let params = this.getDate();
		_.extend(params, {time: time});
		return FlowRouter.path('starting-point-entry', params);
	},
	addDay(event) {
		event.preventDefault();
		let momentObj = this.state.date.add(1, 'days');
		this.setState({
			date: momentObj,
			dateString: this.getDateString(momentObj)
		});
		this.syncURI();
	},
	subtractDay(event) {
		event.preventDefault();
		let momentObj = this.state.date.subtract(1, 'days');
		this.setState({
			date: momentObj,
			dateString: this.getDateString(momentObj)
		});
		this.syncURI();
	},
	syncURI() {
		FlowRouter.setParams(this.getDate());
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
						<li>Starting Point</li>
					</ol>

					<h3>Mentality Depression Program</h3>

					<h4>
						Exercise Three - Starting point{' '}
						<small>
							<a href="#" data-toggle="modal" data-target="#modal">
								<span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
							</a>
						</small>
					</h4>

					<hr />

					<div className="row">
						<div className="col-md-6">
							<div className="clearfix" style={{marginBottom: '4px', textAlign: 'center'}}>
								<a href="#" className="btn btn-sm btn-default pull-left" onClick={this.subtractDay}>
									<span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
								</a>

								<h4 style={{display: 'inline-block', margin: 0, padding: '5px 0 10px'}}>
									{FormattingHelpers.dateFromNow(this.state.date)}
								</h4>

								<a href="#" className="btn btn-sm btn-default pull-right" onClick={this.addDay}>
									<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
								</a>
							</div>

							{this.data.times.map((time, i) => {
								let props = {
									time: time,
									path: this.getNewEntryPath,
									data: this.data.exerciseData,
									date: this.getDate(),
									key: i
								};
								return <StartingPointEntryTable {...props} />
							})}
						</div>

						<StartingPointComments text={''} onSubmit={function(event) {event.preventDefault(); console.log(event)}} />

						<div className="col-md-6">
							<div className="well">
								<h4 style={{marginTop: 0}}>Record what you are currently doing</h4>
								<p>It can really help later on if you are able to provide some detail about:</p>
								<dl style={{paddingBottom: 0, marginBottom: 0}}>
									<dt>What you are doing?</dt><dd>Watching television</dd><br />
									<dt>Where you are doing it?</dt><dd>Lounge</dd><br />
									<dt>Who you were with?</dt><dd>On my own</dd>
								</dl>
							</div>
							<div className="well">
								<p style={{marginBottom: 0}}>At the end of each day have a look at your diary and write any comments you have in the comments box. Think about what you have been up to, and try to note if there were times when you felt better or worse. This will help you and your councillor when you discuss your week at the next session.</p>
							</div>
						</div>
					</div>

				</div>
			);
		}
	}
});
