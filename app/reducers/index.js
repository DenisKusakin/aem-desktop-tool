// @flow
import { reducer as notifications } from 'react-notification-system-redux';
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import servers from './server-list';
import serverInfoDialog from './server-info-reducer';
import errors from './error-reducer';
import newServerFormVisible from './new-server-form';
import removeServer from './remove-server-reducer';
import search from './search-reducer';
import bundles from './bundles-reducer';
import components from './components-reducer';
import bottomNavigation from './bottom-navigation-reducer';
import searchDialog from './search-dialog-reducer';

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
  components,
  bottomNavigation,
  searchDialog
});

export default rootReducer;
