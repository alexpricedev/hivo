import { combineReducers } from 'redux';

import pageSkip from './components/DailyEntries/reducers';

const rootReducer = combineReducers({
  pageSkip,
});

export default rootReducer;
