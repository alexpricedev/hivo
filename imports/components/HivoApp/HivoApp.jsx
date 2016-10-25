import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import Loading from '../Loading/Loading';
import AccountsUIWrapper from '../AccountsUIWrapper/AccountsUIWrapper';
import AddDailyEntry from '../AddDailyEntry/AddDailyEntry';
import DailyEntryList from '../DailyEntryList/DailyEntryList';

const HivoApp = ({ loading, currentUser }) => {
  if (loading) { return <Loading />; }

  return (
    <div>
      <AccountsUIWrapper />
      {
        currentUser &&
        <div>
          <AddDailyEntry />
          <hr />
          <DailyEntryList />
        </div>
      }
    </div>
  );
}

const HivoAppContainer = createContainer(({ pageSkip }) => {
  const sub = Meteor.subscribe('users.all');
  return {
    loading: !sub.ready(),
    currentUser: Meteor.user() || null,
  }
}, HivoApp);

export default HivoAppContainer;
