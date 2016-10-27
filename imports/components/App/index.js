import React from 'react';
import { Link } from 'react-router';

import Loading from '../UI/Loading';
import AccountsUIWrapper from '../Accounts/AccountsUIWrapper';
import NewDailyEntry from '../../containers/DailyEntries/NewDailyEntry';
import DailyEntryList from '../../containers/DailyEntries/DailyEntryList';

const App = ({ loading, currentUser, children }) => {
  if (loading) { return <Loading />; }

  return (
    <div>
      <AccountsUIWrapper />
      { currentUser &&
        <div>
          <center style={{ marginTop: '20px' }}>
            <Link to="/">Home</Link>
            {' - '}
            <Link to="daily">Daily entires</Link>
            <hr />
          </center>
          { children }
        </div> }
    </div>
  );
}

export default App;
