/**
 * A generic submit button.
 */
SubmitButton = React.createClass({
	propTypes: {
		/**
		 * Any modifier classes to be applierd to
		 * the button.
		 */
		modClass: React.PropTypes.string,
		/**
		 * Override the default text
		 */
		text: React.PropTypes.string
	},
	render() {
		let cls = this.props.modClass ? `button ${this.props.modClass}` : 'button';
		let text = this.props.text ? this.props.text : 'Save';
		return (
			<button className={cls}>
				{text}
			</button>
		);
	}
});
