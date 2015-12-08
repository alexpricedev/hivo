PatientIndex = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let uid = Meteor.userId();
		let subscription = Meteor.subscribe('programs', uid);

		return {
			isLoading: !subscription.ready(),
			programs: Programs.find({
				userId: uid
			}).fetch()
		};
	},
	tbody() {
		if (this.data.programs.length) {
			let rows = [];

			_.forEach(this.data.programs, function(program, i) {
				rows.push(
					<tr key={i}>
						<td>
							<a href={FlowHelpers.pathFor(program.route)} title="View program">{program.title}</a>
						</td>
						<td>{program.progress}%</td>
						<td>{FormattingHelpers.dateLabel(program.lastCompleted)}</td>
					</tr>
				);
			});

			return (
				<tbody>
					{rows}
				</tbody>
			);
		}

		return (
			<tbody>
				<tr>
					<td colSpan="3">You are not enrolled in any programs. Please speak with your counsellor about starting a new program.</td>
				</tr>
			</tbody>
		);
	},
	render() {
		return (
			<div>
				<h4>Your Dashboard</h4>

				<hr />

				<table className="table table-striped">
					<thead>
						<tr>
							<th>Programs</th>
							<th>Progress</th>
							<th>Last Completed</th>
						</tr>
					</thead>
					{this.tbody()}
				</table>
			</div>
		);
	}
});
