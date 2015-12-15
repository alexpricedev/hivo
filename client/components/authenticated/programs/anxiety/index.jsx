AnxietyIndex = React.createClass({
	render() {
		return (
			<div>
				<div className="row">

					<div className="col-md-6 col-md-push-3">
						<h3>Anxiety Exercise List</h3>
						<ExerciseList program='anxiety' />
					</div>

				</div>
			</div>
		);
	}
});
