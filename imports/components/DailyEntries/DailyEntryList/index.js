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
      <div>
        <Link
          className="pt-button pt-intent-success"
          style={{marginBottom: '20px'}}
          to="daily/new"
        >
          Create new
        </Link>
        <ul className={styles.ul}>
          {entries.map(entry =>
            <li key={entry._id}>
              <div className="pt-card">
                <DailyEntry {...entry} />
              </div>
              <br />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default DailyEntryList;
