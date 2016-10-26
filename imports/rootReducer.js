import { combineReducers } from 'redux';

import { pageSkip, updateRange } from './components/DailyEntries/reducers';

const rootReducer = combineReducers({
  pageSkip,
  updateRange
});

export default rootReducer;
