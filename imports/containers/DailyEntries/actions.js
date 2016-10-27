import {
  UPDATE_TIMEOFDAY,
  UPDATE_TEXT,
  UPDATE_RANGE,
} from './constants';

const addDailyEntry = function(entry) {
  return () => {
    Meteor.call('dailyEntry.insert', entry);
  };
};

const updateDailyEntryValue = function(target) {
  switch (target.name) {
    case 'timeOfDay':
      return {
        type: UPDATE_TIMEOFDAY,
        value: target.value,
      };
    case 'text':
      return {
        type: UPDATE_TEXT,
        value: target.value,
      };
    case 'mood':
      return {
        type: UPDATE_RANGE,
        value: parseInt(target.value),
      };
  }
};

export { addDailyEntry, updateDailyEntryValue }
