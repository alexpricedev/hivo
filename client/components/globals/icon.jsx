Icon = React.createClass({
	propTypes :{
		/**
		 * The name of the Glyphicon icon to use.
		 * http://glyphicons.com
		 */
		icon: React.PropTypes.string.isRequired
	},
	render() {
		const cls = `glyphicon glyphicon-${this.props.icon}`;
		return (
			<span className={cls}></span>
		);
	}
});
