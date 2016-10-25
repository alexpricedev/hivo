import React from 'react';
import { Provider } from 'react-redux';

import Store from '../../store';
import HivoApp from '../HivoApp/HivoApp';

const Root = () => (
  <Provider store={Store}>
    <HivoApp />
  </Provider>
);

export default Root;
