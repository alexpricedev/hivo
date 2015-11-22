Template.depression.onCreated( () => {
    Template.instance().subscribe( 'impactOfDepression', Meteor.userId() );
});

Template.depression.onRendered(function() {
});

Template.depression.helpers({
    exercises: function() {
        return ImpactOfDepression.find({ userId: Meteor.userId() });
    }
});
