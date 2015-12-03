PatientTableRow = React.createClass({
	fullName() {
		let user = this.props.patient;
		return user.profile.name.first + ' ' + user.profile.name.last;
	},
	emailAddress() {
		return this.props.patient.emails[0].address;
	},
	status() {
		let status = this.props.patient.status;
		if (status.online) {
			return <span className="label label-success">Active now</span>;
		} else {
			if (status.lastLogin) {
				let date = moment(status.lastLogin.date).fromNow();
				return <span className="label label-info">{date}</span>;
			} else {
				return <span className="label label-danger">Never</span>;
			}
		}
	},
	render() {
		return (
			<tr>
				<td><a href="{FlowHelpers.pathFor('adminAddPatient', this.props.patient._id)}" title="View profile">{this.fullName()}</a></td>
				<td>{this.emailAddress()}</td>
				<td>{this.status()}</td>
			</tr>
		);
	}
});
