Meteor.publish( 'patient', function(_id) {
  check(_id, String);

  return Meteor.users.find(
      {_id: _id},
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
