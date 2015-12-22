Login = React.createClass({
	componentDidMount() {
		Modules.client.login({form: "#login"});
	},
	handleSubmit(event) {
		event.preventDefault();
	},
	render() {
		return (
			<div className="login">
				<form
					className="login-form"
					id="login"
					onSubmit={this.handleSubmit}>

					<div className="form-group">
						<label
							className="label login-form-label"
							htmlFor="emailAddress">
								Email Address
						</label>
						<input
							className="input mod-light"
							type="email"
							name="emailAddress"
							placeholder="Enter your email address" />
					</div>

					<div className="form-group">
						<label
							className="label login-form-label"
							htmlFor="password">
								Password
						</label>
						<input
							className="input mod-light"
							type="password"
							name="password"
							placeholder="Enter your super secure password" />
					</div>

					<SubmitButton
						text={'Login'} />

				</form>
			</div>
		);
	}
});
