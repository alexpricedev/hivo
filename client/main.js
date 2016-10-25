/* global Meteor, document */
import React from 'react';
import ReactDOM from 'react-dom';

import Root from '../imports/components/Root/Root';

Meteor.startup(() => {
  ReactDOM.render(
    <Root />,
    document.getElementById('app')
  );
});
