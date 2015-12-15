PublicNavigation = React.createClass({
	render() {
		return (
			<ul className="mainnav">
				<li className="mainnav-item">
					<a
						className="mainnav-item-link is-active"
						href={FlowHelpers.currentRoute('login')}>
							Login
					</a>
				</li>
			</ul>
		);
	}
});
