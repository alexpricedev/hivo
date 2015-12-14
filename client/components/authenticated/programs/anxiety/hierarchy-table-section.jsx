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
		 * The ID for this section. Required as it is used to
		 * update the appropriate entry object in the DB.
		 */
		id: React.PropTypes.string.isRequired,
		/**
		 * An array of entry objects. Required but can be empty.
		 */
		entries: React.PropTypes.array.isRequired,
		/**
		 * Event handler for an edit entry event.
		 */
		handleEdit: React.PropTypes.func.isRequired,
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
		model: 'entries'
	},
	/**
	 * 'handleSort()` is the default event handler for events
	 * triggered by updating or sorting of our entries. We send
	 * this event along with the new entry data to the parent
	 * for DB syncing.
	 */
	handleSort(event) {
		this.props.handleReorder(event, this.state.entries);
	},
	render() {
			return (
				<div
					ref="entries"
					id={this.props.id}
					style={{padding: '30px 0'}}>

					{this.state.entries.map((entry, i) => {
						return (
							<AnxietyHierarchyTableEntry
								key={i}
								text={entry.text}
								percentage={entry.percentage}
								handleEdit={this.props.handleEdit} />
						);
					})}

				</div>
			);
	}
});
