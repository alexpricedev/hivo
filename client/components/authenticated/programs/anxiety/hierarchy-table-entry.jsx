/**
 * A single anxiety hierarchy entry
 */
AnxietyHierarchyTableEntry = React.createClass({
	propTypes: {
		/**
		 * The index of this entry object in the current section
		 * array of objects.
		 */
		index: React.PropTypes.number.isRequired,
		/**
		 * The text for this entry.
		 */
		text: React.PropTypes.string.isRequired,
		/**
		 * The number between 0 and 100 representing the percentage
		 * rating for this entry.
		 */
		percentage: React.PropTypes.number.isRequired,
		/**
		 * The current difficulty section of this entry.
		 */
		difficulty: React.PropTypes.string.isRequired,
		/**
		 * Event handler for an edit entry event.
		 */
		handleEdit: React.PropTypes.func.isRequired,
		/**
		 * Event handler for a delete entry event.
		 */
		handleDelete: React.PropTypes.func.isRequired
	},
	/**
	 * Envoke the edit handler for entries. Passing
	 * the current entry up the component hierarchy.
	 */
	handleEdit(event) {
		// If key up is (space) or (return) trigger edit
		if (event.type == 'keyup') {
			if (event.which != 13 && event.which != 32) {
				return null;
			}
		}
		this.props.handleEdit(
			event,
			{
				id: this.props.index,
				text: this.props.text,
				percentage: parseInt(this.props.percentage),
				difficulty: this.props.difficulty
			}
		);
	},
	render() {
		return (
			<div
				className="hierarchy-table-entry"
				role="button"
				aria-label="Edit entry"
				tabIndex="0"
				onClick={this.handleEdit}
				onKeyUp={this.handleEdit}>

				<p className="hierarchy-table-entry-title">
					{this.props.text}
				</p>

				<span className="hierarchy-table-reorder">
					<Icon icon={'reorder'} />
				</span>

				<span className="hierarchy-table-entry-percentage">
					{this.props.percentage}%
				</span>

				<a
					className="hierarchy-table-entry-delete ignore-move"
					href="#delete"
					title="Delete entry"
					data-index={this.props.index}
					onClick={this.props.handleDelete}>
						<Icon icon={'times'} />
				</a>

			</div>
		);
	}
});
