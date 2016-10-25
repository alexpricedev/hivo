/* global Meteor */
import DailyEntries from '../../imports/collections/daily-entries';

Meteor.methods({

  'dailyEntry.insert'(entry) {
    entry.createdAt = new Date();
    return DailyEntries.insert(entry);
  },

});
