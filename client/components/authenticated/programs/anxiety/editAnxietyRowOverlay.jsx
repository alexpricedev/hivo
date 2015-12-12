/**
 * An whole page overlay that contains a form for
 * adding/editing anxiety hierarchy entries.
 */
EditAnxietyRowOverlay = React.createClass({
	propTypes: {
		/**
		 * An event handler for a cancel `onClick` event.
		 */
		onCancel: React.PropTypes.func.isRequired,
	},
	/**
	 * The state of the overlay contains the values of
	 * the child form elements.
	 */
	getInitialState() {
		return {
			entryText: '',
			entryTextError: {
				status: false,
				message: ''
			},
			entryPercentage: '50'
		};
	},
	/**
	 * Creates a new anxiety hierarchy entry using the
	 * data stored in the state.
	 * @param {Object} event
	 */
	handleSubmit(event) {
		event.preventDefault();
		if (!this.state.entryText.length) {
			this.setState({
				entryTextError: {
					status: true,
					message: 'You didn\'t enter any text!'
				},
			});
		} else {
			// TODO: submit to DB
			console.log(
				this.state.entryText,
				this.state.entryPercentage
			);
		}
	},
	/**
	 * Updates the state with the latest entryText.
	 * @param {Object} event
	 */
	handleEntryTextChange(event) {
		this.setState({
			entryText: event.target.value,
			entryTextError: {
				status: false,
				message: ''
			}
		});
	},
	/**
	 * Updates the state with the latest entryPercentage value.
	 * @param {Object} event
	 */
	handleEntryPercentageChange(event) {
		this.setState({
			entryPercentage: event.target.value
		});
	},
	/**
	 * Turns a numeric percentage value into a helpful word.
	 * @param {String} percentage
	 * @return {String} text
	 */
	getPercentageText(percentage) {
    if (percentage < 30) {
			return 'Okay';
		} else if (percentage >= 30 && percentage < 60) {
			return 'Anxious';
		} else if (percentage >= 60 && percentage < 80) {
			return 'Really anxious';
		} else if (percentage >= 80) {
			return 'I\'m going to die';
		}
  },
	render() {
		let entryTextClass = (this.state.entryTextError.status ?
			'form-group has-error' :
			'form-group'
		);

		return (
			<div>
				<form onSubmit={this.handleSubmit}>

					<div className={entryTextClass}>
						<label
							className="control-label"
							htmlFor="entryText">
								What makes you anxious?
						</label>

						<TextBox
							id={'entryText'}
							placeholder={'Over here!'}
							text={this.state.entryText}
							onChange={this.handleEntryTextChange} />

						<span className="help-block">
							{this.state.entryTextError.message}
						</span>
					</div>

					<div className="form-group">
						<label
							className="control-label"
							htmlFor="entryPercentage">
								What rating would you give that?
						</label>

						<PercentageSlider
							id={'entryPercentage'}
							value={this.state.entryPercentage}
							onChange={this.handleEntryPercentageChange} />
					</div>

					<p>{this.state.entryPercentage}%</p>
					<p>{this.getPercentageText(this.state.entryPercentage)}</p>

					<SubmitButton />
					<CancelButton onClick={this.props.onCancel} />

				</form>
			</div>
		);
	}
});
