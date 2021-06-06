import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'

import {store} from './app/store'
import Weather from './components/Weather';

render(
    <Provider store={store}>
        <Weather/>
    </Provider>,
    document.getElementById('root')
);