/* global Meteor, Counts */

import DailyEntries from '../../imports/collections/daily-entries';

const dailyEntryPubFields = {
  userId: 1,
  timeOfDay: 1,
  text: 1,
  mood: 1,
  createdAt: 1,
};

const getDailyEntriesPublication = function(userId, pageSkip = 0) {
  Counts.publish(
    this,
    'DailyEntryCount',
    DailyEntries.find({ userId })
  );

  return DailyEntries.find(
    { userId },
    {
      fields: dailyEntryPubFields,
      skip: pageSkip,
      sort: {createdAt: -1},
      limit: 10
    }
  );
};

Meteor.publish('daily-entries.all', getDailyEntriesPublication);
