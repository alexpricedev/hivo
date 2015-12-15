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
		this.props.handleEdit(
			event,
			{
				text: this.props.text,
				percentage: parseInt(this.props.percentage)
			}
		);
	},
	render() {
		return (
			<div className="hierarchy-table-entry">

				<p className="hierarchy-table-entry-title">
					{this.props.text}
				</p>

				<span className="hierarchy-table-entry-percentage">
					{this.props.percentage}%
				</span>

				<div className="hierarchy-table-entry-edit">
					<a
						className="hierarchy-table-entry-edit-link ignore-move"
						href="#"
						onClick={this.handleEdit}>
							<Icon icon={'pencil'} />
					</a>

					{' '}

					<a
						className="hierarchy-table-entry-edit-link ignore-move"
						href="#"
						data-index={this.props.index}
						onClick={this.props.handleDelete}>
							<Icon icon={'trash'} />
					</a>
				</div>

			</div>
		);
	}
});
