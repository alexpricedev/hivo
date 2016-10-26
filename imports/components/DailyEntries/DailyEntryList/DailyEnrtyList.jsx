/* global Meteor */
import { createContainer } from 'meteor/react-meteor-data';
import React  from 'react';
import { connect }  from 'react-redux';

import DailyEntries from '../../../collections/daily-entries';
import Loading from '../../Misc/Loading';
import DailyEntryListPagination from './DailyEnrtyListPagination';
import DailyEntry from '../DailyEntry/DailyEntry';
import { changePage } from '../actions';
import styles from './styles.css';

class DailyEntryList extends React.Component {
  render() {
    const { dispatch, loading, dailyEntryList: entries, count } = this.props;

    if (loading) { return <Loading />; }

    let pagination = '';

    if (count > 10) {
      pagination = (
        <DailyEntryListPagination
          handlePageClick={(data)=> {
            return dispatch(changePage(data.selected));
          }}
          pageCount={count / 10}
        />
      );
    }

    return (
      <div>
        <ul className={styles.list}>
          {entries.map(entry =>
            <DailyEntry key={entry._id} {...entry} />
          )}
        </ul>
        {pagination}
      </div>
    );
  }
}

const DailyEntryListContainer = createContainer(({ pageSkip }) => {
  const userId = Meteor.userId();
  const sub = Meteor.subscribe('daily-entries.all', userId, pageSkip);
  return {
    loading: !sub.ready(),
    dailyEntryList: DailyEntries.find(
      { userId },
      {
        sort: {createdAt: -1},
        limit: 10
      }
    ).fetch() || [],
    count: Counts.get('DailyEntryCount'),
  }
}, DailyEntryList);

function mapStateToProps(state) {
  return {
    pageSkip: state.pageSkip
  }
}

export default connect(mapStateToProps)(DailyEntryListContainer);
