// @flow
import {reducer as notifications} from 'react-notification-system-redux'
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import servers from './server-list'
import serverInfoDialog from './server-info-reducer'
import errors from './error-reducer'
import { reducer as formReducer } from 'redux-form'
import newServerFormVisible from './new-server-form'
import removeServer from './remove-server-reducer'
import search from './search-reducer';
import bundles from './bundles-reducer';
import components from './components-reducer';

const rootReducer = combineReducers({
  router,
  notifications,
  servers,
  serverInfoDialog,
  form: formReducer,
  errors,
  newServerFormVisible,
  removeServerDialog: removeServer,
  bundlesSearch: search('bundles'),
  componentsSearch: search('components'),
  bundles,
  components
});

export default rootReducer;
