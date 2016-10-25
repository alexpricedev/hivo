/* global Meteor, Counts */

import DailyEntries from '../../imports/collections/daily-entries';

const dailyEntryPubFields = {
  timeOfDay: 1,
  text: 1,
  mood: 1,
  createdAt: 1,
};

const getDailyEntriesPublication = function(pageSkip = 0) {
  return DailyEntries.find(
    {},
    {
      fields: dailyEntryPubFields,
      skip: pageSkip,
      limit: 10
    }
  );
};

Meteor.publish('daily-entries.all', getDailyEntriesPublication);
