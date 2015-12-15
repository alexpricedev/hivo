/**
 * A page for viewing and managing a users anxiety
 * hierarchy entries.
 */
AnxietyHierarchy = React.createClass({
	/**
	 * We use the `ReactMeteorData` plugin to assist us
	 * in getting data from the DB.
	 */
	mixins: [ReactMeteorData],
	/**
	 * When the state of the page is `overlayIsVisible=true` an overlay
	 * will be shown containing a form to manipulate entry data.
	 */
	getInitialState() {
		return {
			overlayIsVisible: false,
			entry: null
		};
	},
	/**
	 * This is the methoded used in conjunction with the `ReactMeteorData`
	 * plugin. Here we subscribe to the publications and, when the
	 * subscription is ready, update the client with the exercise and
	 * entry data for the current user.
	 */
	getMeteorData() {
		let uid = Meteor.userId();
		let subscription = Meteor.subscribe('exercises', uid, 'anxiety');
		Meteor.subscribe('programs', uid); // Needed for updateExercise

		let exercise = {};
		let entries = {
			hard: [],
			medium: [],
			easy: []
		};

		if (subscription.ready()) {
			exercise = Exercises.findOne({
				userId: uid,
				route: 'anxiety-hierarchy'
			});

			if (exercise.exerciseData.entries) {
				entries = exercise.exerciseData.entries
			}
		};

		return {
			isLoading: !subscription.ready(),
			userId: uid,
			exercise: exercise,
			entries: entries
		};
	},
	/**
	 * Changes the state to show the entry form overlay
	 * @param {Object} event
	 */
	showNewEntryForm(event) {
		event.preventDefault();
		this.setState({
			overlayIsVisible: true,
			entry: null
		});
	},
	/**
	 * Changes the state to hide the entry form overlay
	 * @param {Object} event
	 */
	hideNewEntryForm(event) {
		// Might not be called `onClick`
		if (event) {
			event.preventDefault();
		}

		this.setState({
			overlayIsVisible: false
		});
	},
	/**
	 * Event handler for editing an entry.
	 * @param {Object} event
	 * @param {Object} entry
	 */
	editEntry(event, entry) {
		event.preventDefault();
		this.setState({
			overlayIsVisible: true,
			entry: entry
		});
	},
	render() {
		if (!PermissionHelpers.enrolled) {
			return <NotFound />;
		} else if (this.data.isLoading) {
			return <Loading />;
		} else {

			if (this.state.overlayIsVisible) {

				return (
					<AnxietyEntryOverlay
						userId={this.data.userId}
						entry={this.state.entry}
						exerciseId={this.data.exercise._id}
						entries={this.data.entries}
						onCancel={this.hideNewEntryForm} />
				);

			} else {

				return (
					<div className="anxiety-page">

						<div className="hierarchy-header">
							<h1 className="hierarchy-header-title">
								Your anxiety rating table
							</h1>
							<AddButton
								modClass={'mod-right'}
								onClick={this.showNewEntryForm} />
						</div>

							<AnxietyHierarchyTable
								userId={this.data.userId}
								exerciseId={this.data.exercise._id}
								entries={this.data.entries}
								handleEdit={this.editEntry} />

					</div>
				);

			}

		}
	}
});
