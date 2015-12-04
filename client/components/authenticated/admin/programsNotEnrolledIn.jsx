ProgramsNotEnrolledIn = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe('programs', this.props.patient._id);

		return {
			isLoading: !subscription.ready(),
			enrolledPrograms: Programs.find({
				userId: this.props.patient._id
			}).fetch()
		};
	},
	notEnrolled(enrolledPrograms) {
		let availiblePrograms = _.clone(Modules.both.availiblePrograms);

		_.forEach(this.data.enrolledPrograms, (enrolledProgram) => {
			// Not sure why _ doesn't work here..?
			lodash.remove(
				availiblePrograms,
				function(availibleProgram) {
					return enrolledProgram.route === availibleProgram.route;
				}
			);
		});

		return availiblePrograms;
	},
	render() {
		if (this.data.isLoading) {
			return <Loading />;
		} else {
			if (!PermissionHelpers.admin()) {
				return <NotFound />;
			} else {
				return (
					<div className="row">
						{this.notEnrolled().map(function(program, i) {
							return <EnrollInProgramBlock program={program} key={i} />;
						})}
					</div>
				);
			}
		}
	}
});
