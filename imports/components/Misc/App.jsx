import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import Loading from './Loading';
import AccountsUIWrapper from '../Accounts/AccountsUIWrapper';
import NewDailyEntry from '../DailyEntries/NewDailyEntry/NewDailyEntry';
import DailyEntryList from '../DailyEntries/DailyEntryList/DailyEnrtyList';

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

const AppContainer = createContainer(() => {
  const sub = Meteor.subscribe('users.all');
  return {
    loading: !sub.ready(),
    currentUser: Meteor.user() || null,
  }
}, App);

export default AppContainer;
