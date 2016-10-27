/* global Meteor */
import { createContainer } from 'meteor/react-meteor-data';

import App from '../../components/App';

const AppContainer = createContainer(() => {
  const sub = Meteor.subscribe('users.all');
  return {
    loading: !sub.ready(),
    currentUser: Meteor.user() || null,
  }
}, App);

export default AppContainer;
