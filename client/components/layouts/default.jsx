Default = React.createClass({
  render() {
    return (
      <div className="app-root">
        <AppHeader />

        <div className="container">
          {this.props.yield}
        </div>

				{this.props.footer}

				<Modal slug={this.props.modal} />
      </div>
    );
  }
});
