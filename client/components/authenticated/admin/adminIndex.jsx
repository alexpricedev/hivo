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
					<div className="shelf">
						<h1 className="shelf-title">
							Your Patients
						</h1>
						<a
							className="button mod-shelf"
							href={FlowHelpers.pathFor('adminAddPatient')}>
								Add patient
						</a>
					</div>

					<PatientTable patients={this.data.patients} />

				</div>
			);
		}
	}
});
