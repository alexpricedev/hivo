Template.howIsDepressionAffectingYou.onCreated( () => {
	Template.instance().subscribe( 'impactOfDepression', Meteor.userId() );
	Template.instance().subscribe( 'programs', Meteor.userId() );
});

Template.howIsDepressionAffectingYou.onRendered(function() {
	if (!Session.get('depressionExerciseOneModalSeen')) {
		$('#modal').modal('show');
		Session.set('depressionExerciseOneModalSeen', true);
	}
});

Template.howIsDepressionAffectingYou.helpers({
	exercise: function() {
		var exercise = ImpactOfDepression.findOne({ userId: Meteor.userId() });
		return exercise ? exercise : null;
	}
});

Template.howIsDepressionAffectingYou.events({
	'submit form': function(event) {
		event.preventDefault();

		var props = {
			userId: Meteor.userId(),
			behavioural: event.target.behavioural.value,
			thoughts: event.target.thoughts.value,
			physical: event.target.physical.value
		};

		var exercise = ImpactOfDepression.findOne({ userId: Meteor.userId() });

		Meteor.call('updateImpactOfDepression', exercise._id, props);
		Bert.alert( 'Update successful', 'success', 'growl-top-right' );

		var program = GetActive.findOne({ userId: Meteor.userId() });
		Meteor.call('updateProgramLastCompleted', program._id);

		Session.set('footerProgress', 10);
		FlowRouter.go('depression');
	}
});
