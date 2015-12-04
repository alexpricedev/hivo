AddPatient = React.createClass({
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
			email: event.target.email.value,
			first: event.target.first.value,
			last: event.target.last.value,
      counsellor: Meteor.user()
		};

    Meteor.call('insertPatient', props)
	},
	render() {
		if (this.data.isLoading) {
			return <Loading />;
		} else {
			return (
				<div>
					<h4>Add New Patient</h4>

					<hr />

					<div className="row">
						<div className="col-xs-12 col-sm-6">
							<form onSubmit={this.handleSubmit}>
								<div className="form-group">
									<label htmlFor="first">First name</label>
									<input type="text" className="form-control" id="first" placeholder="Insert the patient's first name" />
								</div>

								<div className="form-group">
									<label htmlFor="last">Last name</label>
									<input type="text" className="form-control" id="last" placeholder="Insert the patient's last name" />
								</div>

								<div className="form-group">
									<label htmlFor="email">Email address</label>
									<input type="email" className="form-control" id="email" placeholder="Insert the patient's email address" />
								</div>

								<button type="submit" className="btn btn-primary">Send invite</button>
								<a href={FlowHelpers.pathFor('index')} className="btn btn-default">Cancel</a>
							</form>
						</div>
					</div>
				</div>
			);
		}
	}
});
