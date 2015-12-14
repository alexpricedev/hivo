/**
 * A percentage range slider.
 */
PercentageSlider = React.createClass({
	propTypes: {
		/**
		 * The `id` of the range input.
		 */
		id: React.PropTypes.string,
		/**
		 * The current `value` of the range input. This is
		 * required because without it the user wont be able
		 * to change the value.
		 */
		value: React.PropTypes.string.isRequired,
		/**
		 * A function to handle the `onChange` event triggered
		 * when the handle is moved. This will usually update
		 * `this.props.value`.
		 */
		onChange: React.PropTypes.func.isRequired,
	},
	getDefaultProps() {
		return {
			id: 'range'
		};
	},
	render() {
		return (
			<input
        type="range"
				id={this.props.id}
        min="0"
        max="100"
        step="5"
        value={this.props.value}
        onChange={this.props.onChange} />
		);
	}
});
