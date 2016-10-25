/* global Meteor */
import DailyEntries from '../../imports/collections/daily-entries';

Meteor.methods({

  'dailyEntry.insert'(entry) {
    entry.userId = Meteor.user()._id;
    entry.createdAt = new Date();
    return DailyEntries.insert(entry);
  },

});
