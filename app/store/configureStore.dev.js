import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { createEpicMiddleware } from 'redux-observable';
import epic from './../epics'
import persistState from 'redux-localstorage'
import epicDependencies from './../epics/dependencies.js'

const epicMiddleware = createEpicMiddleware(epic, {dependencies: epicDependencies});

const history = createHashHistory();
const localstorage = persistState();

const configureStore = (initialState) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  //EPIC Middleware
  middleware.push(epicMiddleware)

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  // const logger = createLogger({
  //   level: 'info',
  //   collapsed: true
  // });
  // middleware.push(logger);

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  //Redux localstorage
  // middleware.push(localstorage);

  // Redux DevTools Configuration
  const actionCreators = {
    // ...counterActions,
    ...routerActions,
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  enhancers.push(localstorage);
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  if (module.hot) {
    module.hot.accept('./../epics', () => {
      const rootEpic = require('./../epics').default;
      epicMiddleware.replaceEpic(rootEpic);
    });
  }

  return store;
};

export default { configureStore, history };
