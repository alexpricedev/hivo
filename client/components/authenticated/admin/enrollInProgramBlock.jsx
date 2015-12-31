EnrollInProgramBlock = React.createClass({
	tags() {
		let tags = [];

		if (this.props.program.tags.length) {
			_.forEach(this.props.program.tags, function(tag, i) {
				let cls = `badge mod-${tag}`;
				tags.push(
					<span className={cls} key={i}>{tag}</span>
				);
			});

			return (
				<span className="program-block-body-tags">
					{tags}
				</span>
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
			<div className="program-block">
				<h3 className="program-block-title">
					{this.props.program.title}
				</h3>
				<div className="program-block-body">
					{this.tags()}
					<p>{this.props.program.description}</p>
					<a
						href="#enroll"
						className="button enroll"
						data-program={this.props.program.route}
						onClick={this.enroll}>Enroll patient
					</a>
				</div>
			</div>
		);
	}
});
