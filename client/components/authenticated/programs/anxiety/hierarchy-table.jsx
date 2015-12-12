/**
 * A table for displaying the things in life that makes the user
 * anxious.
 */
AnxietyHierarchyTable = React.createClass({
	/**
	 * We use the `ReactMeteorData` plugin to assist us
	 * in getting data from the DB.
	 */
	mixins: [ReactMeteorData],
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
	 * The reorder event handler for the `AnxietyHierarchyTableSection`s.
	 * This is triggered when an entry is moved. This event handler updates
	 * the DB with the new order (and object) for that section.
	 * @param {Object} event
	 * @param {Array} groupEntries
	 */
	updateEntryOrder(event, groupEntries) {
		if (event.type === 'sort') {
			let entries = this.data.entries;

			entries[event.target.id] = groupEntries;

			let props = {
				userId: this.data.userId,
				exerciseData: {
					entries: entries
				}
			};

			Meteor.call(
				'updateExercise',
				this.data.exercise._id,
				props
			);
		}
	},
	render() {
		if (this.data.isLoading) {
			return <Loading />;
		} else if (!PermissionHelpers.enrolled) {
			return <NotFound />;
		} else {
			return (
				<div>

					<h5>Stuff that makes your really anxious</h5>
					<AnxietyHierarchyTableSection
						id={'hard'}
						entries={this.data.entries.hard}
						handleReorder={this.updateEntryOrder} />

					<h5>Stuff you don’t like the sound of doing</h5>
					<AnxietyHierarchyTableSection
						id={'medium'}
						entries={this.data.entries.medium}
						handleReorder={this.updateEntryOrder} />

					<h5>Stuff you would rather avoid doing</h5>
					<AnxietyHierarchyTableSection
						id={'easy'}
						entries={this.data.entries.easy}
						handleReorder={this.updateEntryOrder} />

				</div>
			);
		}
	}
});
