/**
 * A table for displaying the things in life that makes the user
 * anxious.
 */
AnxietyHierarchyTable = React.createClass({
	render() {
		return (
			<div>
				<h5>Stuff that makes your really anxious</h5>
				<AnxietyHierarchyTableEntry />

				<h5>Stuff you don’t like the sound of doing</h5>
				<AnxietyHierarchyTableEntry />

				<h5>Stuff you would rather avoid doing</h5>
				<AnxietyHierarchyTableEntry />
			</div>
		);
	}
});
