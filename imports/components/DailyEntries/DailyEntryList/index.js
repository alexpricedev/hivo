import React  from 'react';
import { Link } from 'react-router';

import Loading from '../../UI/Loading';
import Shelf from '../../UI/Shelf';
import DailyEntry from '../DailyEntry';

import styles from './styles.css';

class DailyEntryList extends React.Component {
  render() {
    const { loading, entries } = this.props;

    if (loading) { return <Loading />; }

    return (
      <div>

        <Shelf title="Your Daily Enties">
          <Link
            className="pt-button pt-intent-success"
            to="daily/new"
          >
            Create new
          </Link>
        </Shelf>

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
