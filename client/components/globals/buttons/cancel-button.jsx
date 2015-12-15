/**
 * A generic cancel button.
 */
CancelButton = React.createClass({
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
		let cls = this.props.modClass ? `button mod-cancel ${this.props.modClass}` : 'button mod-cancel';
		return (
			<a
				className={cls}
				href="#"
				onClick={this.props.onClick}>
					Cancel
			</a>
		);
	}
});
