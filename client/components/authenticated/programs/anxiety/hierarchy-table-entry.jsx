/**
 * A single anxiety hierarchy entry
 */
AnxietyHierarchyTableEntry = React.createClass({
	render() {
		return (
			<a
				href="#"
				className="btn btn-default clearfix"
				style={{display: 'block'}}>

				<span className="pull-left">
					Public speaking
				</span>

				<span className="pull-right">
					85%
				</span>

			</a>
		);
	}
});
