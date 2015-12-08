AdminIndex = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let uid = Meteor.userId();
		let subscription = Meteor.subscribe('patients', uid);
		let patients = Meteor.users.find({'profile.counsellor._id': uid}).fetch();

		return {
			isLoading: !subscription.ready(),
			patients: patients
		};
	},
	render() {
		if (this.data.isLoading) {
			return <Loading />;
		} else {
			return (
				<div>
					<div className="row">
						<div className="col-xs-6">
							<h4 className="pull-left">Your Patients</h4>
						</div>
						<div className="col-xs-6">
							<a href={FlowHelpers.pathFor('adminAddPatient')} className="btn btn-sm btn-success pull-right">Add Patient</a>
						</div>
					</div>

					<hr style={{marginTop: '10px'}} />

					<PatientTable patients={this.data.patients} />

				</div>
			);
		}
	}
});
