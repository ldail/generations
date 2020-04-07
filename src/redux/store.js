import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

const middlewares = [];

middlewares.push(logger);

const store = createStore(rootReducer,  compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(...middlewares)));

export default store;