import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './redux/store';
import DevApp from './components/DevApp';

ReactDOM.render(<Provider store={store}><DevApp /></Provider>, document.getElementById('root'));
serviceWorker.unregister();
