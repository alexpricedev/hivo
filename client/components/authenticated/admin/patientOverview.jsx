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
				return (
					<div>
            <h4>{FormattingHelpers.fullName(this.data.patient)}</h4>
            <h5>
                <a href="mailto:{FormattingHelpers.emailAddress(this.data.patient)}">
									{FormattingHelpers.emailAddress(this.data.patient)}
                </a>
            </h5>

            <hr />

            <ProgramTable patient={this.data.patient} />
            <ProgramsNotEnrolledIn patient={this.data.patient} />

					</div>
				);
			}
		}
	}
});
