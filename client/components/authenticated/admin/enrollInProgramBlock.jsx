EnrollInProgramBlock = React.createClass({
	tags() {
		let tags = [];

		if (this.props.program.tags.length) {
			_.forEach(this.props.program.tags, function(tag, i) {
				let cls = `label label-${tag}`;
				tags.push(
					<span className={cls} key={i}>{tag}</span>
				);
			});

			return (
				<p>
					{tags}
				</p>
			);
		}
	},
	enroll(event) {
    event.preventDefault();

    Meteor.call(
			'enroll',
			FlowRouter.current().params._id,
			event.target.getAttribute('data-program')
		);

    Bert.alert('Enroll successful', 'success', 'growl-top-right');
	},
	render() {
		return (
			<div className="col-sm-6 col-md-4">
				<div className="thumbnail">
					<div className="caption">
						<h3>{this.props.program.title}</h3>
						{this.tags()}
						<p>{this.props.program.description}</p>
						<p><a href="#enroll" className="btn btn-primary enroll" data-program={this.props.program.route} onClick={this.enroll}>Enroll patient</a></p>
					</div>
				</div>
			</div>
		);
	}
});
