/**
 * A generic add button.
 */
AddButton = React.createClass({
	propTypes: {
		/**
		 * Any modifier classes to be applierd to
		 * the button.
		 */
		modClass: React.PropTypes.string,
		/**
		 * An event handler for the `onClick` event.
		 */
		onClick: React.PropTypes.func.isRequired
	},
	render() {
		let cls = this.props.modClass ? `button ${this.props.modClass}` : 'button';
		return (
			<a
				onClick={this.props.onClick}
				href="#"
				className={cls}>
					<Icon icon={'plus'} />
					<span className="sr-only">
						Add
					</span>
			</a>
		);
	}
});
