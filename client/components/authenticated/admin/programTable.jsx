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
					<tr key={i}>
						<td>{program.title}</td>
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
					<td colSpan="2">They are not enrolled in any programs.</td>
				</tr>
			</tbody>
		);
	},
	render() {
		if (this.data.isLoading) {
			return <Loading />;
		} else {
			return (
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Programs</th>
							<th>Last Completed</th>
						</tr>
					</thead>
					{this.tbody()}
				</table>
			);
		}
	}
});
