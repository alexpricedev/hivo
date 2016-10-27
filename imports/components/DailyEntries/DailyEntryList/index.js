import React  from 'react';

import Loading from '../../UI/Loading';
import DailyEntry from '../DailyEntry';

import styles from './styles.css';

class DailyEntryList extends React.Component {
  render() {
    const { loading, entries } = this.props;

    if (loading) { return <Loading />; }

    return (
      <div>
        <ul className={styles.list}>
          {entries.map(entry =>
            <DailyEntry key={entry._id} {...entry} />
          )}
        </ul>
      </div>
    );
  }
}

export default DailyEntryList;
