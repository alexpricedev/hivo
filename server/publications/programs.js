Meteor.publish( 'programs', function( userId ) {
    check(userId, String);
    return GetActive.find({userId: userId});
});
