Template.patientIndex.onCreated(function() {
  this.subscribe('programs', Meteor.userId());
});

Template.patientIndex.helpers({
  programs() {
    return Programs.find({
      userId: Meteor.userId()
    });
  }
});
