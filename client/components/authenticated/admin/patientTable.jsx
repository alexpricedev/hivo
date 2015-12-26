PatientTable = React.createClass({
	render() {
		return (
			<table className="table">
				<thead className="table-head">
					<tr className="table-row">
						<th className="table-heading">Name</th>
						<th className="table-heading">Email Address</th>
						<th className="table-heading">Last Logged In</th>
					</tr>
				</thead>
				<tbody>
					{this.props.patients.map((patient, index) => {
						return <PatientTableRow key={index} patient={patient} />;
					})}
				</tbody>
			</table>
		);
	}
});
