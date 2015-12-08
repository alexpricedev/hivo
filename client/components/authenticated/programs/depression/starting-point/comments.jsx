StartingPointComments = React.createClass({
	componentWillReceiveProps(props) {
		this.textarea.value = props.data.comments;
	},
	handleSubmit(event) {
		event.preventDefault();

		let exercise = this.props.data.exercise;
		let date = this.props.dateString;

		// If there is no data for this date, set it up
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
			userId: this.props.data.userId,
			exerciseData: exercise.exerciseData
		};

		Meteor.call('updateExercise', exercise._id, exerciseProps, (err, data) => {
			if (!err) {
				Bert.alert('Comments saved successfully', 'success', 'growl-top-right');

				let program = Programs.findOne({
					userId: this.props.data.userId,
					route: 'depression'
				});

				Meteor.call('updateProgramLastCompleted', program._id);
			} else {
				Bert.alert('There was an error submiting your entry', 'danger', 'growl-top-right');
				console.log(err);
			}
		});
	},
	render() {
		return (
			<div className="col-md-6">
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="comments">Daily comments</label>
						<textarea className="form-control" id="comments" rows="7" placeholder="Write any comments about your day here. This is a good place to note any times during the day you felt better or worse" ref={(ref) => this.textarea = ref} defaultValue={this.props.data.comments || ''}></textarea>
					</div>
					<button type="submit" className="btn btn-primary">Save comments</button>
					<br /><br />
				</form>
			</div>
		);
	}
});
