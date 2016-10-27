import React from 'react';
import { Provider } from 'react-redux';

import Store from '../../store';
import App from '../App';

const Root = ({ children }) => (
  <Provider store={Store}>
    <App children={children} />
  </Provider>
);

export default Root;
