DepressionIndex = React.createClass({
	render() {
		return (
			<div>
				<Breadcrumb links={[
					{link: 'index', text: 'Dashboard'},
					{link: null, text: 'Depression'}
				]} />

				<h3>Mentality Depression Program</h3>

				<div className="row">

					<div className="col-md-6">
						<ExerciseList program='depression' />
					</div>

					<div className="col-md-6">
						<div className="well">
							<p style={{fontSize: '18px'}}>Sometimes the hardest steps are the first ones, and by getting this far you have already taken your first step to get on top of your low mood.</p>
						</div>
					</div>

				</div>
			</div>
		);
	}
});
