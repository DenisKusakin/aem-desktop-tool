// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import { createEpicMiddleware } from 'redux-observable';
import epic from './../epics'
import epicDependencies from './../epics/dependencies.js'
import persistState from 'redux-localstorage'

const epicMiddleware = createEpicMiddleware(epic, {dependencies: epicDependencies});
const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router, epicMiddleware, persistState());

function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
