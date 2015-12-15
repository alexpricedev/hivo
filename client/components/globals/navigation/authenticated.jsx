AuthenticatedNavigation = React.createClass({
	currentUserEmail() {
		return Meteor.user().emails[0].address;
	},
	render() {
		let home = `mainnav-item-link is-${FlowHelpers.currentRoute('index')}`;
		return (
			<ul className="mainnav">
					<li className="mainnav-item">
							<a
								className={home}
								href="/">
									Anxiety table
							</a>
					</li>
					<li className="mainnav-item">
						<a
							className="mainnav-item-link"
							href="#"
							onClick={Meteor.logout}>
								Logout
						</a>
					</li>
			</ul>
		);
	}
});
