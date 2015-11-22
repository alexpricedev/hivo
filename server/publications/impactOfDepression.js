Meteor.publish( 'impactOfDepression', function( userId ) {
    check(userId, String);
    return ImpactOfDepression.find({userId: userId});
});
