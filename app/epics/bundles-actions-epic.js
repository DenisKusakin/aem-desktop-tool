import Rx from 'rxjs/Rx';
import { success } from 'react-notification-system-redux';

const showNotyOnBundleActionSuccess = (action$, store, { actions: { BUNDLE_ACTION_FULFILLED, START_BUNDLE } }) =>
    action$.ofType(BUNDLE_ACTION_FULFILLED)
        .map(({ payload: { serverId, bundleId, type } }) => {
          const bundle = store.getState().bundles[serverId].items.find(x => x.id === bundleId);

          return success({ title: 'Bundle Action Success', message: `${bundle.name} ${type === START_BUNDLE ? 'started' : 'stopped'}` });
        });

export default showNotyOnBundleActionSuccess;
