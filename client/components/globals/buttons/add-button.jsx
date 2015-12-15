/**
 * A generic add button.
 */
AddButton = React.createClass({
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
				className="button">
					<Icon icon={'plus'} />
					<span className="sr-only">
						Add
					</span>
			</a>
		);
	}
});
