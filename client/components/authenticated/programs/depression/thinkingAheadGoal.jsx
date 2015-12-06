ThinkingAheadGoal = React.createClass({
	componentDidMount() {
		Modules.client.initDatepicker();
	},
	getId(string) {
		return string + this.props.index;
	},
	scoreOptions(selected) {
		let options =  [
			'0 - Not at all',
			'1',
			'2 - Occasionally',
			'3',
			'4 - Often',
			'5',
			'6 - Anytime'
		];

		let optionComponents = [];

		_.forEach(options, (option, i) => {
			optionComponents.push(
				<option value={i} key={i}>{option}</option>
			);
		});

		return optionComponents;
	},
	render() {
		return (
			<div className="col-md-6 goal">
				<div className="well well-sm clearfix">
					<div className="form-group">
						<label htmlFor="date">Today's date</label>
						<div className="input-group">
							<span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
							<input className="form-control datepicker" id={this.getId('date')} type="text" placeholder="Please select today's date" defaultValue={FormattingHelpers.dateString(this.props.date)} />
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="goal">Details about your goal</label>
						<textarea className="form-control" id={this.getId('goal')} rows="4" placeholder="Write some details about the goal you want to achive and what you want to get out of the treatment." defaultValue={this.props.goal}></textarea>
						<span className="help-block">Write in here the specific goals and achievements you wish to attain from these program.</span>
					</div>

					<div className="form-group">
						<label>I can do this now</label><br />
						<select className="form-control" id={this.getId('score')} defaultValue={this.props.score}>
							{this.scoreOptions()}
						</select>
						<span className="help-block">Pick an option that represents how often you can achive this goal</span>
					</div>
				</div>
			</div>
		);
	}
});


