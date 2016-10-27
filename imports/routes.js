import React from 'react';
import {
  Router, browserHistory, Route, IndexRoute, Redirect
} from 'react-router';

import { requireAuth } from './route-hooks';

import Root from './containers/Root';

import Index from './components/Index';

// Daily entry components
import DailyEntryList from './containers/DailyEntries/DailyEntryList';
import NewDailyEntry from './containers/DailyEntries/NewDailyEntry';

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={Index} />

      <Route path="daily" component={DailyEntryList} />
      <Route path="daily/new" component={NewDailyEntry} />
    </Route>
  </Router>
);

