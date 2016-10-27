import { combineReducers } from 'redux';

import { newDailyEntryForm } from './containers/DailyEntries/reducers';

const rootReducer = combineReducers({
  newDailyEntryForm
});

export default rootReducer;
