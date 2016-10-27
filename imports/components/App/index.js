import React from 'react';

import Loading from '../UI/Loading';
import AccountsUIWrapper from '../Accounts/AccountsUIWrapper';
import NewDailyEntry from '../../containers/DailyEntries/NewDailyEntry';
import DailyEntryList from '../../containers/DailyEntries/DailyEntryList';

const App = ({ loading, currentUser }) => {
  if (loading) { return <Loading />; }

  return (
    <div>
      <AccountsUIWrapper />
      {
        currentUser &&
        <div>
          <NewDailyEntry />
          <hr />
          <DailyEntryList />
        </div>
      }
    </div>
  );
}

export default App;
