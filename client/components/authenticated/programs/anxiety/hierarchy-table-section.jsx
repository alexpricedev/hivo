/**
 * A single section of the hierarchy table.
 * One of hard, medium or easy tasks.
 */
AnxietyHierarchyTableSection = React.createClass({
	/**
	 * The entries in the the table can be reordered.
	 * We use the `RubaXa/Sortable` plugin to help with that.
	 */
	mixins: [SortableMixin],
	propTypes: {
		/**
		 * A string representing this section. Required as it is
		 * used to update the appropriate entry object in the DB.
		 */
		difficulty: React.PropTypes.string.isRequired,
		/**
		 * An array of entry objects. Required but can be empty.
		 */
		entries: React.PropTypes.array.isRequired,
		/**
		 * Event handler for an edit entry event.
		 */
		handleEdit: React.PropTypes.func.isRequired,
		/**
		 * Event handler for a delete entry event.
		 */
		deleteEntry: React.PropTypes.func.isRequired,
		/**
		 * The event handler for handling changes to the order
		 * of the entries in this section.
		 */
		handleReorder: React.PropTypes.func.isRequired
	},
	/**
	 * The state of the section contains the current entries
	 * for this section.
	 */
	getInitialState() {
		return {
			entries: [],
		};
	},
	/**
	 * When the section is mounted, setup the state using the
	 * props given.
	 */
	componentDidMount() {
		this.setState({
			entries: this.props.entries
		});
	},
	/**
	 * When the DB is updated this component will receive
	 * new props, so update the state.
	 * @param {Object} nextProps
	 */
	componentWillReceiveProps(nextProps) {
		this.setState({
			entries: nextProps.entries
		});
	},
	/**
	 * These options are used by the `SortableMixin`.
	 */
	sortableOptions: {
		ref: 'entries',
		group: 'entries',
		model: 'entries',
		filter: '.ignore-move'
	},
	/**
	 * 'handleSort()` is the default event handler for events
	 * triggered by updating or sorting of our entries. We send
	 * this event along with the new entry data to the parent
	 * for DB syncing.
	 * @param {Object} event
	 */
	handleSort(event) {
		let sortedEntries = _.sortByOrder(
			this.state.entries,
			['percentage', 'text'],
			['desc', 'asc']
		);

		this.setState({
			entries: sortedEntries
		});

		this.props.handleReorder(event, sortedEntries);
	},
	/**
	 * Event handler for deleting an entry from this exercise.
	 * @param {Object} event
	 */
	handleDelete(event) {
		event.preventDefault();

		let index = $(event.target).parent().data('index');

		let settings = {
			title: 'Confirm delete',
			message: 'Are you sure you want to delete this entry?',
			transition: 'fade',
			labels: {ok:'Delete'},
			onok: () => {
				this.props.deleteEntry(this.props.difficulty, index);
			}
		};

		let confirm = alertify.confirm()
													.set(settings)
													.show();
	},
	noEntries() {
		if (this.state.entries.length == 0) {
			return (
				<div className="hierarchy-table-entry mod-empty ignore-move">
					No entries
				</div>
			);
		}
	},
	render() {
		let cls = `hierarchy-table-section mod-${this.props.difficulty}`;
		return (
			<div
				className={cls}
				ref="entries"
				id={this.props.difficulty}>

				{this.state.entries.map((entry, i) => {
					return (
						<AnxietyHierarchyTableEntry
							key={i}
							index={i}
							text={entry.text}
							percentage={entry.percentage}
							handleEdit={this.props.handleEdit}
							handleDelete={this.handleDelete} />
					);
				})}

				{this.noEntries()}

			</div>
		);
	}
});
