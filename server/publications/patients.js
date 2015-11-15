Meteor.publish( 'patients', function() {
  return Meteor.users.find(
      {'profile.counsellor._id': this.userId},
      {
          fields: {
              emails: 1,
              status: 1,
              'profile.name': 1,
              'profile.counsellor': 1,
              'profile.isAdmin': 1
          }
      }
  );
});
