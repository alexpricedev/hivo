/* global Meteor */

Meteor.publish('users.all', function() {
  return Meteor.users.find({});
});
