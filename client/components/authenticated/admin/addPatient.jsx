AddPatient = React.createClass({
	getInitialState() {
		return {
			first: '',
			second: '',
			email: ''
		};
	},
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe('patients', Meteor.userId());

		return {
			isLoading: !subscription.ready()
		};
	},
	handleSubmit(event) {
    event.preventDefault();

		let props = {
			email: this.state.email,
			first: this.state.first,
			last: this.state.last,
      counsellor: Meteor.user()
		};

    Meteor.call('insertPatient', props)
	},
	updateState(event) {
		let obj = {};
		obj[event.target.id] = event.target.value;
		console.log(obj);
		this.setState(obj);
	},
	render() {
		if (this.data.isLoading) {
			return <Loading />;
		} else {
			return (
				<div>
					<div className="shelf mod-border">
						<h1 className="shelf-title">
							Add Patient
						</h1>
					</div>

					<form onSubmit={this.handleSubmit}>
						<div className="form-group mod-light">
							<label
								className="label"
								htmlFor="first">
									First name
							</label>
							<TextBox
								id="first"
								text={this.state.first}
								modClass="mod-light"
								onChange={this.updateState}
								placeholder="Insert the patient's first name" />
						</div>

						<div className="form-group">
							<label
								className="label"
								htmlFor="last">
									Second name
							</label>
							<TextBox
								id="second"
								text={this.state.second}
								modClass="mod-light"
								onChange={this.updateState}
								placeholder="Insert the patient's second name" />
						</div>

						<div className="form-group">
							<label
								className="label"
								htmlFor="email">
									Email address
							</label>
							<EmailInput
								id="email"
								text={this.state.email}
								modClass="mod-light"
								onChange={this.updateState}
								placeholder="Insert the patient's email address" />
						</div>

						<SubmitButton
							modClass="mod-margin"
							text="Send Invite" />
						<a
							href={FlowHelpers.pathFor('index')}
							className="button mod-cancel">
								Cancel
						</a>
					</form>
				</div>
			);
		}
	}
});
