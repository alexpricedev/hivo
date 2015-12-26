PatientOverview = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		this.patientId = FlowRouter.current().params._id;
		let subscription = Meteor.subscribe('patient', this.patientId);

		return {
			isLoading: !subscription.ready(),
			patient: Meteor.users.findOne({
				_id: this.patientId
			})
		};
	},
	render() {
		if (this.data.isLoading) {
			return <Loading />;
		} else {
			if (!PermissionHelpers.admin()) {
				return <NotFound />;
			} else {
				let mailto = `mailto:${FormattingHelpers.emailAddress(this.data.patient)}`
				return (
					<div>
						<div className="shelf">
							<h1 className="shelf-title">
								{FormattingHelpers.fullName(this.data.patient)}
							</h1>
							<a
								className="button mod-cancel mod-right"
								href={FlowHelpers.pathFor('index')}>
									Back
							</a>
							<a
								className="button mod-right mod-margin"
								href={mailto}>
									Email patient
							</a>
						</div>

            <ProgramTable patient={this.data.patient} />
            <ProgramsNotEnrolledIn patient={this.data.patient} />

					</div>
				);
			}
		}
	}
});
