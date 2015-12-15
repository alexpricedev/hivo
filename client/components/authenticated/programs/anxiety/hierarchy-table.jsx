/**
 * A table for displaying the things in life that makes the user
 * anxious.
 */
AnxietyHierarchyTable = React.createClass({
	propTypes: {
		/**
		 * The Mongo `_id` for the current user.
		 */
		userId: React.PropTypes.string.isRequired,
		/**
		 * The Mongo `_id` for the current exercise.
		 */
		exerciseId: React.PropTypes.string.isRequired,
		/**
		 * An object containing the `hard`, `medium` and `easy`
		 * arrays of entry objects.
		 */
		entries: React.PropTypes.object.isRequired,
		/**
		 * Event handler for an edit entry event.
		 */
		handleEdit: React.PropTypes.func.isRequired
	},
	/**
	 * The reorder event handler for the `AnxietyHierarchyTableSection`s.
	 * This is triggered when an entry is moved. This event handler updates
	 * the DB with the new order (and object) for that section.
	 * @param {Object} event
	 * @param {Array} groupEntries
	 */
	updateEntryOrder(event, groupEntries) {
		if (event.type === 'sort') {
			let entries = this.props.entries;

			entries[event.target.id] = groupEntries;

			let props = {
				userId: this.props.userId,
				exerciseData: {
					entries: entries
				}
			};

			Meteor.call(
				'updateExercise',
				this.props.exerciseId,
				props
			);
		}
	},
	/**
	 * Deletes an entry from this exercise.
	 * @param {String} difficulty
	 * @param {Number} index
	 */
	deleteEntry(difficulty, index) {
		let entries = this.props.entries;

		if (entries[difficulty][index]) {
			// Remove entry at index
			entries[difficulty].splice(index, 1);

			let props = {
				userId: this.props.userId,
				exerciseData: {
					entries: entries
				}
			};

			Meteor.call(
				'updateExercise',
				this.props.exerciseId,
				props
			);
		}
	},
	render() {
		return (
			<div className="hierarchy-table">

				<h2 className="hierarchy-table-header">
					Most difficult
				</h2>
				<AnxietyHierarchyTableSection
					difficulty={'hard'}
					entries={this.props.entries.hard}
					handleEdit={this.props.handleEdit}
					deleteEntry={this.deleteEntry}
					handleReorder={this.updateEntryOrder} />

				<h2 className="hierarchy-table-header">
					Medium difficulty
				</h2>
				<AnxietyHierarchyTableSection
					difficulty={'medium'}
					entries={this.props.entries.medium}
					handleEdit={this.props.handleEdit}
					deleteEntry={this.deleteEntry}
					handleReorder={this.updateEntryOrder} />

				<h2 className="hierarchy-table-header">
					Least difficult
				</h2>
				<AnxietyHierarchyTableSection
					difficulty={'easy'}
					entries={this.props.entries.easy}
					handleEdit={this.props.handleEdit}
					deleteEntry={this.deleteEntry}
					handleReorder={this.updateEntryOrder} />

			</div>
		);
	}
});
