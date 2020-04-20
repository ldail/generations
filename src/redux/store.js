import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const middlewares = [];

// middlewares.push(logger);
middlewares.push(thunk);

let enhancers = '';
enhancers = compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...middlewares));
enhancers = applyMiddleware(...middlewares)

const store = createStore(rootReducer, enhancers);

export default store;