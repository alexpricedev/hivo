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
				<h1 className="login-title">
					Login
				</h1>

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
							placeholder="Enter your hotmail from 1998" />
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
							placeholder="Your super secure password" />
					</div>

					<SubmitButton
						text={'Login'} />

				</form>
			</div>
		);
	}
});
