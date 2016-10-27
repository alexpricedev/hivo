import { Meteor } from 'meteor/meteor';

/*
 * A react-router `onEnter` hook that re-routers the
 * the user to the login view if they're not logged in.
 */
export function requireAuth(nextState, replace) {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}
