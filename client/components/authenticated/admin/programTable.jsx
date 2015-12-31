ProgramTable = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe('programs', this.props.patient._id);

		return {
			isLoading: !subscription.ready(),
			programs: Programs.find({
				userId: this.props.patient._id
			}).fetch()
		};
	},
	tbody() {
		if (this.data.programs.length) {
			let rows = [];

			_.forEach(this.data.programs, function(program, i) {
				rows.push(
					<tr
						className="table-row"
						key={i}>

						<td className="table-cell">
							{program.title}
						</td>
						<td className="table-cell">
							{FormattingHelpers.dateLabel(program.lastCompleted)}
						</td>

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
				<tr className="table-row">
					<td
						className="table-cell"
						colSpan="2">
						They are not enrolled in any programs.
					</td>
				</tr>
			</tbody>
		);
	},
	render() {
		if (this.data.isLoading) {
			return <Loading />;
		} else {
			return (
				<table className="table">
					<thead className="table-head">
						<tr className="table-row">
							<th className="table-heading">Programs</th>
							<th className="table-heading">Last Completed</th>
						</tr>
					</thead>
					{this.tbody()}
				</table>
			);
		}
	}
});
