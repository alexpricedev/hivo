/**
 * A generic submit button.
 */
SubmitButton = React.createClass({
	propTypes: {
		/**
		 * Any modifier classes to be applierd to
		 * the button.
		 */
		modClass: React.PropTypes.string
	},
	render() {
		let cls = this.props.modClass ? `button ${this.props.modClass}` : 'button';
		return (
			<button className={cls}>
				Submit
			</button>
		);
	}
});
