StartingPointEntryTable = React.createClass({
	getRows() {
		if (this.props.data && this.props.data[this.props.time]) {
			let rows = [];

			rows = _.sortBy(rows, function(row) {
				return row.entryId;
			});

			_.forEach(this.props.data[this.props.time], (row, i) => {
				let props = {
					data: row,
					date: this.props.date,
					time: this.props.time,
					key: i
				};
				rows.push(
					<StartingPointEntryTableRow {...props} />
				);
			});

			return rows;
		}
	},
	getBadge(data) {
		let num = 0,
				cls = 'badge pull-right';

		if (data && data[this.props.time]) {
			num = data[this.props.time] ? data[this.props.time].length : 0;

			switch(num) {
				case 0:
					cls = cls + ' alert-danger';
					break;
				case 1:
					cls = cls + ' alert-info';
					break;
				default:
					cls = cls + ' alert-success';
			}
		} else {
			cls = cls + ' alert-danger';
		}

		return <span className={cls}>{num} / 2</span>;
	},
	render() {
		return (
			<div className="well well-sm">
				<table className="table" style={{margin: 0}}>
					<thead>
						<tr>
							<th>
								{FormattingHelpers.sentanceCase(this.props.time)}
								{this.getBadge(this.props.data)}
							</th>
						</tr>
					</thead>
					<tbody>
						{this.getRows()}
						<tr>
							<td>
								<a className="btn btn-block btn-warning" href={this.props.path(this.props.time)}>
									Add an entry
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
});
