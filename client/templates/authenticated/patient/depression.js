Template.depression.onCreated(() => {
  Template.instance().subscribe('exercises', Meteor.userId(), 'depression');
});

Template.depression.helpers({
  exercises() {
    return Exercises.find({
      userId: Meteor.userId(),
			program: 'depression'
    });
  }
});
