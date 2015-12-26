PatientTableRow = React.createClass({
	status() {
		let status = this.props.patient.status;
		if (status) {
			if (status.online) {
				return <span className="badge mod-success">Active now</span>;
			} else {
				let date = status.lastLogin ? status.lastLogin.date : null;
				return FormattingHelpers.dateLabel(date);
			}
		}
		return FormattingHelpers.dateLabel(null);
	},
	render() {
		let link = FlowHelpers.pathFor(
			'adminPatientOverview',
			{_id: this.props.patient._id}
		);
		let mail_link = `mailto:${FormattingHelpers.emailAddress(this.props.patient)}`;
		return (
			<tr className="table-row">
				<td className="table-cell">
					<a
						className="link"
						role="button"
						tabIndex="0"
						href={link}
						title="View profile">
							{FormattingHelpers.fullName(this.props.patient)}
					</a>
				</td>
				<td className="table-cell">
					<a
						className="link"
						role="button"
						tabIndex="0"
						href={mail_link}
						title="Email patient">
							{FormattingHelpers.emailAddress(this.props.patient)}
					</a>
				</td>
				<td className="table-cell">
					{this.status()}
				</td>
			</tr>
		);
	}
});
