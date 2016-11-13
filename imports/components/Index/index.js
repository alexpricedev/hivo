import React from 'react';
import { Link } from 'react-router';

import styles from './styles.css';

const Index = () => {
  return (
    <center style={{ marginTop: '20px' }}>
      <Link
        className="pt-button pt-intent-primary"
        role="button"
        to="daily/new"
      >
        Quick add daily entry
      </Link>
      <br /><br />
      <Link className={styles.link} to="daily">
        Your daily entires
      </Link>
    </center>
  );
}

export default Index;
