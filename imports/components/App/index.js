import React from 'react';
import '@blueprintjs/core/dist/blueprint.css';

import Loading from '../UI/Loading';
import Nav from '../UI/Nav';

import styles from './styles.css';

const App = ({ loading, currentUser, children }) => {
  if (loading) { return <Loading />; }

  return (
    <div>
      <Nav />
      <div className={styles.wrapper}>
        { currentUser && children }
      </div>
    </div>
  );
}

export default App;
