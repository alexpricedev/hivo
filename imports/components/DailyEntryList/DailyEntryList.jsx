/* global Meteor */
import { createContainer } from 'meteor/react-meteor-data';
import React  from 'react';
import { connect }  from 'react-redux';

import DailyEntries from '../../collections/daily-entries';
import DailyEntry from '../DailyEntry/DailyEntry';
import { changePage } from './actions';

class DailyEntryList extends React.Component {
  render() {
    const { dailyEntryList: entries } = this.props;

    return (
      <div>
        <ul>
          {entries.map(entry =>
            <DailyEntry
              key={entry._id}
              {...entry}
            />
          )}
        </ul>
      </div>
    );
  }
}

const DailyEntryListContainer = createContainer(({ pageSkip }) => {
  const sub = Meteor.subscribe('daily-entries.all', pageSkip);
  return {
    loading: sub.ready(),
    dailyEntryList: DailyEntries.find(
      {},
      {
        sort: {createdAt: -1},
        limit: 10
      }
    ).fetch() || [],
  }
}, DailyEntryList);

function mapStateToProps(state) {
  return {
    pageSkip: state.pageSkip
  }
}

export default connect(mapStateToProps)(DailyEntryListContainer);
