import all from './search-actions';
import bundlesActions from './bundles-actions';

const HOME_PAGE_MOUNT = 'HOME_PAGE_MOUNT';
const HIDE_DRAWER = 'HIDE_DRAWER';
const SHOW_DRAWER = 'SHOW_DRAWER';
const ADD_SERVER = 'ADD_SERVER';

const SHOW_DELETE_SERVER_FORM = 'SHOW_DELETE_SERVER_FORM';
const HIDE_DELETE_SERVER_FORM = 'HIDE_DELETE_SERVER_FORM';
const REMOVE_SERVER = 'REMOVE_SERVER';
const REMOVE_SERVER_FULFILLED = 'REMOVE_SERVER_FULFILLED';

const SHOW_NEW_SERVER_FORM = 'SHOW_NEW_SERVER_FORM';
const HIDE_NEW_SERVER_FORM = 'HIDE_NEW_SERVER_FORM';

const FETCH_SERVERS = 'FETCH_SERVERS';
const SAVE_NEW_SERVER = 'SAVE_NEW_SERVER';

const UPDATE_SERVER_STATUS = 'UPDATE_SERVER_STATUS';
const UPDATE_SERVER_STATUS_ERROR = 'UPDATE_SERVER_STATUS_ERROR';
const INTENT_UPDATE_SERVER_STATUS = 'INTENT_UPDATE_SERVER_STATUS';

const SHOW_SERVER_INFO_DIALOG = 'SHOW_SERVER_INFO_DIALOG';
const HIDE_SERVER_INFO_DIALOG = 'HIDE_SERVER_INFO_DIALOG';
const SERVER_INFO_FULFILLED = 'SERVER_INFO_FULFILLED';

const ERROR = 'ERROR';

module.exports = {
  ...all,
  ...bundlesActions,
  HIDE_DRAWER,
  SHOW_DRAWER,
  ADD_SERVER,
  SHOW_NEW_SERVER_FORM,
  HIDE_NEW_SERVER_FORM,
  SAVE_NEW_SERVER,
  FETCH_SERVERS,
  SHOW_DELETE_SERVER_FORM,
  HIDE_DELETE_SERVER_FORM,
  REMOVE_SERVER,
  REMOVE_SERVER_FULFILLED,
  UPDATE_SERVER_STATUS,
  UPDATE_SERVER_STATUS_ERROR,
  INTENT_UPDATE_SERVER_STATUS,
  HOME_PAGE_MOUNT,
  SHOW_SERVER_INFO_DIALOG,
  HIDE_SERVER_INFO_DIALOG,
  SERVER_INFO_FULFILLED,
  ERROR
};

module.exports.homePageMount = () => ({ type: HOME_PAGE_MOUNT });

module.exports.showDrawer = () => ({ type: SHOW_DRAWER });
module.exports.hideDrawer = () => ({ type: HIDE_DRAWER });
module.exports.addServer = (payload) => ({ type: ADD_SERVER, payload });
module.exports.showNewServerForm = () => ({ type: SHOW_NEW_SERVER_FORM });
module.exports.hideNewServerForm = () => ({ type: HIDE_NEW_SERVER_FORM });
module.exports.fetchServers = () => ({ type: FETCH_SERVERS });

module.exports.deleteServerIntent = id => ({ type: SHOW_DELETE_SERVER_FORM, payload: { id } });
module.exports.hideDeleteServerForm = () => ({ type: HIDE_DELETE_SERVER_FORM });
module.exports.removeServer = id => ({ type: REMOVE_SERVER, payload: { id } });
module.exports.removeServerFulfielled = id => ({ type: REMOVE_SERVER_FULFILLED, payload: { id } });

module.exports.saveNewServer = ({ name, host, login, password }) => ({ type: SAVE_NEW_SERVER, payload: { name, host, login, password } });
module.exports.updateServerStatus = (id, lastStatus) => ({ type: UPDATE_SERVER_STATUS, payload: { id, lastStatus } });
module.exports.updateServerStatusError = (id, { time, ...error }) => ({
  type: UPDATE_SERVER_STATUS_ERROR,
  payload: {
    id,
    time,
    error: { ...error }
  }
});
module.exports.intentUpdateServerStatus = ({ id, host, login, password }) => ({ type: INTENT_UPDATE_SERVER_STATUS, payload: { id, host, login, password } });
module.exports.showServerInfoDialog = (serverId) => ({ type: SHOW_SERVER_INFO_DIALOG, payload: { id: serverId } });
module.exports.hideServerInfoDialog = () => ({ type: HIDE_SERVER_INFO_DIALOG });
module.exports.serverInfoFulfilled = (id, data, time) => ({ type: SERVER_INFO_FULFILLED, payload: { id, data, time } });
module.exports.error = (error) => ({ type: ERROR, payload: { error } });
