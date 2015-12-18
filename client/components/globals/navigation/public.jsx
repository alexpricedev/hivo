PublicNavigation = React.createClass({
	render() {
		return (
			<ul className="mainnav">
				<li className="mainnav-item">
					<a
						className="mainnav-item-link is-active"
						href={FlowHelpers.pathFor('login')}>
							Login
					</a>
				</li>
			</ul>
		);
	}
});
