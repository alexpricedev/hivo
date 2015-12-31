AdminNavigation = React.createClass({
	render() {
		let home = `mainnav-item-link is-${FlowHelpers.currentRoute('index')}`;
		return (
			<ul className="mainnav">
				<li className="mainnav-item">
						<a
							className={home}
							href="/">
								Patients
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
