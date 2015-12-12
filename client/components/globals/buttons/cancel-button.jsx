/**
 * A generic cancel button.
 */
CancelButton = React.createClass({
	propTypes: {
		/**
		 * An event handler for the `onClick` event.
		 */
		onClick: React.PropTypes.func.isRequired,
	},
	render() {
		return (
			<a
				onClick={this.props.onClick}
				href="#"
				className="btn btn-default">
					Cancel
			</a>
		);
	}
});
