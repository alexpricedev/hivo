AppHeader = React.createClass({
	brandLink() {
		if (!Meteor.loggingIn() && !Meteor.userId()) {
			return FlowRouter.path('login');
		}

		return FlowRouter.path('index');
	},
	navigationItems() {
		if (!Meteor.loggingIn() && Meteor.user()) {
			return <AuthenticatedNavigation />;
		} else {
			return <PublicNavigation />;
		}
	},
	render() {
		return (
			<nav className="header" role="navigation">
				<div className="container">
					<a
						className="header-logo"
						href={this.brandLink()}>
							hivo
					</a>

					{this.navigationItems()}
				</div>
			</nav>
		);
	}
});
