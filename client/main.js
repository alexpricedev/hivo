/* global Meteor, document */
import React from 'react';
import ReactDOM from 'react-dom';

import Root from '../imports/containers/Root';

Meteor.startup(() => {
  ReactDOM.render(
    <Root />,
    document.getElementById('root')
  );
});
