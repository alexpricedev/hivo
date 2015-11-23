Template.patientIndex.onCreated(() => {
  Template.instance().subscribe('programs', Meteor.userId());
});

Template.patientIndex.helpers({
  programs: function() {
    return Programs.find({
      userId: Meteor.userId()
    });
  }
});
