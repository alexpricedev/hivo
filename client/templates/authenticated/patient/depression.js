Template.depression.onCreated(() => {
  Template.instance().subscribe('exercises', Meteor.userId(), 'depression');
});

Template.depression.onRendered(function() {});

Template.depression.helpers({
  exercises: function() {
    return Exercises.find({
      userId: Meteor.userId(),
			program: 'depression'
    });
  }
});
