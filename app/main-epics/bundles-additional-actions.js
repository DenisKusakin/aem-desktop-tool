import Rx from 'rxjs/Rx';
import { setMetaInf, getMetaInf } from './../db';
import {
  BUNDLE_START_WATCHING,
  BUNDLE_STOP_WATCHING,
  UPDATE_BUNDLES_WATCHING_INFO,
  bundleUpdateWatchingInfo
} from './../actions';

const BUNDLES_WATCHING_META_KEY = 'bundlesWatched';

const watchBundleEpic = event$ =>
  event$
    .filter(x => x.type === BUNDLE_START_WATCHING || x.type === BUNDLE_STOP_WATCHING)
    .flatMap(({ type, payload: { serverId, bundleId } }) =>
      getMetaInf({ serverId, BUNDLES_WATCHING_META_KEY })
        .map(meta => ({ meta, serverId, bundleId, type }))
    )
    .flatMap(({ type, meta, serverId, bundleId }) =>
      setMetaInf({
        serverId,
        key: BUNDLES_WATCHING_META_KEY,
        data: type === BUNDLE_START_WATCHING ? meta.filter(x => x !== bundleId).push(bundleId) : meta.filter(x => x !== bundleId)
      })
    );

export default event$ => Rx.Observable.merge(
  watchBundleEpic(event$)
);
