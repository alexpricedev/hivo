Modal = React.createClass({
	getData() {
		return Modules.client.modals[this.props.slug];
	},
	render() {
		let data = this.getData();
		if (data) {
			return (
				<div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modalTitle">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
									</button>
								<h4 className="modal-title" id="modalTitle">{data.title}</h4>
							</div>
							<div className="modal-body">
								<p>{data.text}</p>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return <div></div>
		}
	}
});
