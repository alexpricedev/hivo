/* global Meteor */

import DailyEntries from '../../imports/collections/daily-entries';

const dailyEntryPubFields = {
  userId: 1,
  timeOfDay: 1,
  text: 1,
  mood: 1,
  createdAt: 1,
};

const getDailyEntriesPublication = function(userId, pageSkip = 0) {
  return DailyEntries.find(
    { userId },
    {
      fields: dailyEntryPubFields,
      skip: pageSkip,
      limit: 10
    }
  );
};

Meteor.publish('daily-entries.all', getDailyEntriesPublication);
