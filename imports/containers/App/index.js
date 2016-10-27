/* global Meteor */
import { createContainer } from 'meteor/react-meteor-data';

import App from '../../components/App';

const AppContainer = createContainer(({ children }) => {
  const sub = Meteor.subscribe('users.all');
  return {
    loading: !sub.ready(),
    currentUser: Meteor.user() || null,
    children,
  }
}, App);

export default AppContainer;
