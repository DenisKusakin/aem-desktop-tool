import Rx from 'rxjs/Rx';
import { success, warning, error, hide } from 'react-notification-system-redux';
import { combineEpics } from 'redux-observable';

const showNotyOnBundleActionSuccess = (action$, store, { actions: { BUNDLE_ACTION_FULFILLED, START_BUNDLE } }) =>
  action$.ofType(BUNDLE_ACTION_FULFILLED)
    .map(({ payload: { serverId, bundleId, type } }) => {
      const bundle = store.getState().bundles[serverId].items.find(x => x.id === bundleId);

      return success({
        title: 'Bundle Action Success',
        message: `${bundle.name} ${type === START_BUNDLE ? 'started' : 'stopped'}`
      });
    });

const showNotyOnBundleStateChanged = (action$, store, { actions: { BUNDLE_STATE_CHANGED } }) =>
  action$
  .ofType(BUNDLE_STATE_CHANGED)
  .flatMap(({ payload: { serverId, bundleId, data: { prevState, newState } } }) => {
    const server = store.getState().servers.items.find(x => x.id === serverId);
    const bundle = store.getState().bundles[serverId].items.find(x => x.id === bundleId);

    const warningNoty = warning({ title: `Bundle state changed on ${server.name} for ${bundle.name}`, message: `${prevState} -> ${newState}` });
    const hideError = hide(`bundleDisabled${serverId}-${bundleId}`);
    if (bundle.stateRaw === 32) {
      return Rx.Observable.of(warningNoty, hideError);
    }
    return Rx.Observable.of(warningNoty);
  });

const showNotyOnBundleDisabled = (action$, store, { actions: { SHOW_BUNDLE_DISABLED_NOTY } }) =>
  action$
  .ofType(SHOW_BUNDLE_DISABLED_NOTY)
  .flatMap(({ payload: { serverId, bundleId } }) => {
    const server = store.getState().servers.items.find(x => x.id === serverId);
    const bundle = store.getState().bundles[serverId].items.find(x => x.id === bundleId);
    const noty = {
      title: `Bundle ${bundle.name} is not active on ${server.name}`,
      autoDismiss: 0,
      position: 'br',
      uid: `bundleDisabled${serverId}-${bundleId}`
    };
    return Rx.Observable.of(error(noty));
  });

export default combineEpics(
  showNotyOnBundleActionSuccess,
  showNotyOnBundleStateChanged,
  showNotyOnBundleDisabled
);
