Template.depression.onCreated(function() {
  this.subscribe('exercises', Meteor.userId(), 'depression');
});

Template.depression.helpers({
  exercises() {
    return Exercises.find({
      userId: Meteor.userId(),
			program: 'depression'
    });
  }
});
