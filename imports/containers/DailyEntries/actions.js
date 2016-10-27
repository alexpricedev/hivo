import {
  UPDATE_TIMEOFDAY,
  UPDATE_TEXT,
  UPDATE_RANGE,
  RESET_FORM,
} from './constants';

const addDailyEntry = function(entry) {
  return (dispatch, getState) => {
    const { newDailyEntryForm: form } = getState();
    Meteor.call('dailyEntry.insert', {
      timeOfDay: form.timeOfDay,
      text: form.text,
      mood: form.mood
    }, (error) => {
      if (!error) {
        dispatch({ type: RESET_FORM });
      }
    });
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
