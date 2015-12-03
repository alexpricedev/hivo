PatientTable = React.createClass({
	render() {
		return (
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Name</th>
						<th>Email Address</th>
						<th>Last Logged In</th>
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
