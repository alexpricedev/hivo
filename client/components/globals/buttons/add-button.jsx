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
				className="btn btn-default">
					<span
						className="glyphicon glyphicon-plus"
						aria-hidden="true">
					</span>
					<span
						className="sr-only">
							Add
					</span>
			</a>
		);
	}
});
