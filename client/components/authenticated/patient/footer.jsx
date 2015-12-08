Footer = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let uid = Meteor.userId();
		let subscription = Meteor.subscribe('programs', uid);

		return {
			isLoading: !subscription.ready(),
			program: Programs.findOne({
				userId: uid,
				route: this.getProgram()
			})
		};
	},
	getProgram() {
		let pathname = FlowRouter.current().path;
		return pathname.split('/', 2)[1];
	},
	render() {
		if (this.data.isLoading) {
			return <Loading />;
		} else if (!PermissionHelpers.enrolled) {
			return <NotFound />;
		} else {
			let progress = `${this.data.program.progress}%`;
			return (
				<footer className="footer">
					<div className="container">
						<div className="progress">
							<div className="progress-bar progress-bar-striped progress-bar-success" style={{width: progress}}>
								{progress}
							</div>
						</div>
					</div>
				</footer>
			);
		}
	}
});
