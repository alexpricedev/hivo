ImpactOfDepression = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let uid = Meteor.userId();
		let subscription = Meteor.subscribe('exercises', uid, 'depression');
		Meteor.subscribe('programs', uid); // Needed for updateExercise

		return {
			isLoading: !subscription.ready(),
			userId: uid,
			exercise: Exercises.findOne({
				userId: uid,
				route: 'impact-of-depression'
			})
		};
	},
	handleSubmit(event) {
		event.preventDefault();

		let props = {
			userId: this.data.userId,
			exerciseData: {
				behavioural: this.behavioural.value,
				thoughts: this.thoughts.value,
				physical: this.physical.value
			}
		};

		// 10% complete
		Modules.client.updateExercise(this.data.exercise, props, 10);
	},
	render() {
		if (this.data.isLoading) {
			return <Loading />;
		} else if (!PermissionHelpers.enrolled) {
			return <NotFound />;
		} else {
			return (
				<div>
					<Breadcrumb links={[
						{link: 'index', text: 'Dashboard'},
						{link: 'depression', text: 'Depression'},
						{link: null, text: 'How Is Depression Affecting You?'}
					]} />

					<h3>Mentality Depression Program</h3>

					<h4>
						Exercise One - How Is Your Depression and Low Mood Affecting You?{' '}
						<small>
							<a href="#" data-toggle="modal" data-target="#modal">
								<span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
							</a>
						</small>
					</h4>

					<hr />

					<form onSubmit={this.handleSubmit}>
						<div className="row">
							<div className="col-md-4">
								<label htmlFor="behavioural">Behavioural</label>
								<textarea className="form-control" ref={(ref) => this.behavioural = ref} id="behavioural" rows="3" placeholder="Behavioural changes..." defaultValue={this.data.exercise.exerciseData.behavioural}></textarea>
								<span className="help-block">Write in here the things you have stopped doing or now do differently</span>
							</div>

							<div className="col-md-4">
								<label htmlFor="thoughts">Thoughts</label>
								<textarea className="form-control" id="thoughts" ref={(ref) => this.thoughts = ref} rows="3" placeholder="Changes in thought..." defaultValue={this.data.exercise.exerciseData.thoughts}></textarea>
								<span className="help-block">Write in here the specific types of unhelpful thoughts that go through your head</span>
							</div>

							<div className="col-md-4">
								<label htmlFor="physical">Physical</label>
								<textarea className="form-control" id="physical" rows="3" ref={(ref) => this.physical = ref} placeholder="Physical changes..." defaultValue={this.data.exercise.exerciseData.physical}></textarea>
								<span className="help-block">Write in here the physical changes you have noticed</span>
							</div>

							<div className="col-md-12">
								<hr />
								<button type="submit" className="btn btn-primary pull-right">Save</button>
								<br /><br /><br />
							</div>
						</div>
					</form>
				</div>
			);
		}
	}
});

