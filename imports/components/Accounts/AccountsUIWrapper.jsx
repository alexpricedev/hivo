import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import styles from './styles.css';

class AccountsUIWrapper extends React.Component {
  componentDidMount() {
    this.view = Blaze.render(
      Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container)
    );
  }
  componentWillUnmount() {
    Blaze.remove(this.view);
  }
  render() {
    return <div className={styles.container} ref="container" />;
  }
}

export default AccountsUIWrapper;
