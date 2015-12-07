StartingPointComments = React.createClass({
	render() {
		return (
			<div className="col-md-6">
				<form onSubmit={this.props.onSubmit}>
					<div className="form-group">
						<label htmlFor="comments">Daily comments</label>
						<textarea className="form-control" id="comments" rows="7" placeholder="Write any comments about your day here. This is a good place to note any times during the day you felt better or worse" defaultValue={this.props.text}></textarea>
					</div>
					<button type="submit" className="btn btn-primary">Save comments</button>
					<br /><br />
				</form>
			</div>
		);
	}
});
