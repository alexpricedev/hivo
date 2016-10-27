/* global Meteor */
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import DailyEntries from '../../../collections/daily-entries';

import DailyEntryList from '../../../components/DailyEntries/DailyEntryList';

const DailyEntryListContainer = createContainer(() => {
  const userId = Meteor.userId();
  const sub = Meteor.subscribe('daily-entries.all', userId);
  return {
    loading: !sub.ready(),
    entries: DailyEntries.find(
      { userId },
      {
        sort: {createdAt: -1},
      }
    ).fetch() || [],
  }
}, DailyEntryList);

export default connect()(DailyEntryListContainer);
