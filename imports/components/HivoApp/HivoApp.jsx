import React from 'react';

import AddDailyEntry from '../AddDailyEntry/AddDailyEntry';
import DailyEntryList from '../DailyEntryList/DailyEntryList';

const HivoApp = () => (
  <div>
    <AddDailyEntry />
    <hr />
    <DailyEntryList />
  </div>
);

export default HivoApp;
