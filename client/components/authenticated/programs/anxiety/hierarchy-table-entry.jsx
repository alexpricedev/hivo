/**
 * A single anxiety hierarchy entry
 */
AnxietyHierarchyTableEntry = React.createClass({
	propTypes: {
		/**
		 * The text for this entry.
		 */
		text: React.PropTypes.string.isRequired,
		/**
		 * The number between 0 and 100 representing the percentage
		 * rating for this entry.
		 */
		percentage: React.PropTypes.number.isRequired
	},
	render() {
		return (
			<div
				href="#"
				className="alert alert-info clearfix"
				style={{display: 'block'}}>

				<span className="pull-left">
					{this.props.text}
				</span>

				<span className="pull-right">
					{this.props.percentage}%
				</span>

			</div>
		);
	}
});
