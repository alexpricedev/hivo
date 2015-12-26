/**
 * A generic email input.
 */
EmailInput = React.createClass({
	propTypes: {
		/**
		 * The `id` of the input.
		 */
		id: React.PropTypes.string,
		/**
		 * A `placeholder` for the input.
		 */
		placeholder: React.PropTypes.string,
		/**
		 * The current `value` of the email input. This is
		 * required because without it, the input will
		 * never display anything.
		 */
		text: React.PropTypes.string.isRequired,
		/**
		 * Any modifier classes to be applierd to
		 * the input.
		 */
		modClass: React.PropTypes.string,
		/**
		 * A function to handle the `onChange` event triggered
		 * when the email is typed in. This will usually update
		 * `this.props.text`.
		 */
		onChange: React.PropTypes.func.isRequired
	},
	getDefaultProps() {
		return {
			id: 'email',
			placeholder: 'Enter your email address'
		};
	},

	render() {
		let cls = this.props.modClass ? `input ${this.props.modClass}` : 'input';
		return (
			<input
				type="email"
				className={cls}
				id={this.props.id}
				placeholder={this.props.placeholder}
				value={this.props.text}
				onKeyUp={this.props.onKeyUp}
				onChange={this.props.onChange} />
		);
	}
});
