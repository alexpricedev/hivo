Breadcrumb = React.createClass({
	render() {
		return (
			<ol className="breadcrumb">
				{this.props.links.map((link, i) => {
					if (link.link) {
						return <li key={i}><a href={FlowHelpers.pathFor(link.link)}>{link.text}</a></li>
					}
					return <li key={i}>{link.text}</li>
				})}
			</ol>
		);
	}
});
