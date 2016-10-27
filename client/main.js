/* global document */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';

import { routes } from '/imports/routes';

Meteor.startup(() => {
  ReactDOM.render(
    routes,
    document.getElementById('root')
  );
});
