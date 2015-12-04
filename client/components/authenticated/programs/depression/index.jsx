DepressionIndex = React.createClass({
	render() {
		return (
			<div>
				<ol className="breadcrumb">
					<li><a href={FlowHelpers.pathFor('index')}>Dashboard</a></li>
					<li>Depression</li>
				</ol>

				<h3>Mentality Depression Program</h3>

				<div className="row">

					<div className="col-md-6">
						<ExerciseList program='depression' />
					</div>

					<div className="col-md-6">
						<div className="jumbotron">
							<p>Sometimes the hardest steps are the first ones, and by getting this far you have already taken your first step to get on top of your low mood.</p>
						</div>
					</div>

				</div>
			</div>
		);
	}
});
