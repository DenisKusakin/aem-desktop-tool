import Rx from 'rxjs/Rx';
import { findServers } from './../db';
import { stopBundle, startBundle } from './../sling-api';
import {
  START_BUNDLE,
  STOP_BUNDLE,
  updateBundlesIntent,
  bundleActionFulfilled
} from './../actions';

const bundlesActions = event$ =>
  event$
    .filter(x => x.type === START_BUNDLE || x.type === STOP_BUNDLE)
    .flatMap(({ type, payload: { serverId, bundleId } }) =>
      findServers({ _id: serverId })
        .map(({ host, login, password }) => ({ type, host, login, password, bundleId, serverId }))
    )
    .flatMap(({ type, host, login, password, bundleId, serverId }) => {
      if (type === START_BUNDLE) {
        return startBundle({ host, login, password })(bundleId)
          .map(x => ({ ...x, serverId, type, bundleId }));
      }
      return stopBundle({ host, login, password })(bundleId)
        .map(x => ({ ...x, serverId, type, bundleId }));
    })
    .flatMap(({ type, serverId, bundleId }) => Rx.Observable.of(bundleActionFulfilled({ type, serverId, bundleId }), updateBundlesIntent({ serverId })));

export default bundlesActions;
