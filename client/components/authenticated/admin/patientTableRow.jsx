PatientTableRow = React.createClass({
	status() {
		let status = this.props.patient.status;
		if (status) {
			if (status.online) {
				return <span className="label label-success">Active now</span>;
			} else {
				let date = status.lastLogin ? status.lastLogin.date : null;
				return FormattingHelpers.dateLabel(date);
			}
		}
		return FormattingHelpers.dateLabel(null);
	},
	render() {
		return (
			<tr>
				<td>
					<a href={FlowHelpers.pathFor('adminPatientOverview', {_id: this.props.patient._id})} title="View profile">
						{FormattingHelpers.fullName(this.props.patient)}
					</a>
				</td>
				<td>{FormattingHelpers.emailAddress(this.props.patient)}</td>
				<td>{this.status()}</td>
			</tr>
		);
	}
});
