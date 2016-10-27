import {
  UPDATE_TIMEOFDAY,
  UPDATE_TEXT,
  UPDATE_RANGE,
  RESET_FORM,
} from './constants';

const initalState = {
  timeOfDay: 'morning',
  text: '',
  mood: 5,
};

const newDailyEntryForm = function(state = initalState, action = {}) {
  switch (action.type) {
    case UPDATE_TIMEOFDAY:
      return Object.assign({}, state, {
        timeOfDay: action.value
      });
    case UPDATE_TEXT:
      return Object.assign({}, state, {
        text: action.value
      });
    case UPDATE_RANGE:
      return Object.assign({}, state, {
        mood: parseInt(action.value)
      });
    case RESET_FORM:
      return initalState;
    default:
      return state;
  }
};

export { newDailyEntryForm };
