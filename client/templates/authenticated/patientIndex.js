Template.patientIndex.onCreated( () => {
    Template.instance().subscribe( 'programs', Meteor.userId() );
});

Template.patientIndex.helpers({
    programs: function() {
        return GetActive.find({ userId: Meteor.userId() });
    }
});
