import { combineReducers } from 'redux';

import pageSkip from './components/DailyEntryList/reducers';

const rootReducer = combineReducers({
  pageSkip,
});

export default rootReducer;
