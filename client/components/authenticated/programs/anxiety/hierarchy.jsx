/**
 * A page for viewing and managing a users anxiety
 * hierarchy entries.
 */
AnxietyHierarchy = React.createClass({
	/**
	 * When the state of the page is `editMode=true` an overlay
	 * will be shown containing a form to manipulate entry data.
	 */
	getInitialState() {
		return {
			editMode: false
		};
	},
	/**
	 * Changes the state so the user can add a new
	 * entry to the table.
	 * @param {Object} event
	 */
	addEntry(event) {
		event.preventDefault();
		this.setState({
			editMode: true
		});
	},
	/**
	 * Resets the editMode state so the hierarchy table
	 * is visible.
	 * @param {Object} event
	 */
	cancelAddEntry(event) {
		event.preventDefault();
		this.setState({
			editMode: false
		});
	},
	render() {
		if (this.state.editMode) {
			return (
				<EditAnxietyRowOverlay onCancel={this.cancelAddEntry} />
			);
		} else {
			return (
				<div className="row">

					<div className="col-md-6 col-md-push-3">

						<h3>Your anxiety rating table</h3>
						<AddButton onClick={this.addEntry} />

						<AnxietyHierarchyTable />

					</div>

				</div>
			);
		}
	}
});
