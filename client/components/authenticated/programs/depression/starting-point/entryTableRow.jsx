StartingPointEntryTableRow = React.createClass({
	getText() {
		let d = this.props.data;

		if (d.what) {
			return {
				prefix: 'What',
				text: d.what
			};
		} else if (d.where) {
			return {
				prefix: 'Where',
				text: d.where
			};
		} else if (d.who) {
			return {
				prefix: 'Who',
				text: d.where
			};
		}

		return {
			prefix: 'Error',
			text: 'Empty entry!'
		};
	},
	getEditPath() {
		let params = this.props.date;
		_.extend(params, {
			time: this.props.time,
			entryId: this.props.data.entryId
		});
		return FlowRouter.path('starting-point-entry', params);
	},
	render() {
		let text = this.getText();
		return (
			<tr>
				<td>
					<small className="text-muted">
						{text.prefix}
					</small>{' '}
					<a href={this.getEditPath()} title="Edit entry">
						{text.text}
					</a>
				</td>
			</tr>
		);
	}
});
