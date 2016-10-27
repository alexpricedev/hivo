import React  from 'react';
import { Link } from 'react-router';

import Loading from '../../UI/Loading';
import DailyEntry from '../DailyEntry';

import styles from './styles.css';

class DailyEntryList extends React.Component {
  render() {
    const { loading, entries } = this.props;

    if (loading) { return <Loading />; }

    return (
      <div className={styles.wrapper}>
        <Link className={styles.link} to="daily/new">
          Create new
        </Link>
        <ul>
          {entries.map(entry =>
            <DailyEntry key={entry._id} {...entry} />
          )}
        </ul>
      </div>
    );
  }
}

export default DailyEntryList;
