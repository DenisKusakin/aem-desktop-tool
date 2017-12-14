import Rx from 'rxjs/Rx';
import { setMetaInf, getMetaInf } from './../db';
import {
  BUNDLE_START_WATCHING,
  BUNDLE_STOP_WATCHING,
  UPDATE_BUNDLES,
  bundleStateChanged,
  bundleDeployed,
  bundleRemoved
} from './../actions';

const BUNDLES_WATCHING_META_KEY = 'bundlesWatched';

const watchBundleEpic = event$ =>
  event$
    .filter(x => x.type === BUNDLE_START_WATCHING || x.type === BUNDLE_STOP_WATCHING)
    .flatMap(({ type, payload: { serverId, bundleId } }) =>
      getMetaInf({ serverId, BUNDLES_WATCHING_META_KEY })
        .map(meta => ({ meta, serverId, bundleId, type }))
        .do(x => console.log(JSON.stringify(x)))
    )
    .flatMap(({ type, meta, serverId, bundleId }) => {
      const filteredMeta = (meta || []).filter(x => x !== bundleId);
      console.log("!!", JSON.stringify(filteredMeta), bundleId);
      return setMetaInf({
        serverId,
        key: BUNDLES_WATCHING_META_KEY,
        data: type === BUNDLE_START_WATCHING ? [...filteredMeta, bundleId] : filteredMeta
      });
    })
    .do(() => console.log("Yes"))
    .filter(x => false);

const compareBundles = ({ serverId, prevItems, newItems, traceItems }) => {
  traceItems.map(bundleToTrace => {
    const bundleInPrevList = prevItems.find(x => x.id === bundleToTrace);
    const bundleInNewList = newItems.find(x => x.id === bundleToTrace);

    if (bundleInNewList && bundleInPrevList) {
      if (bundleInPrevList.stateRaw !== bundleInNewList.stateRaw) {
        // return bundle state changed
        const arg = {
          serverId,
          bundleId: bundleToTrace,
          data: {
            prevState: bundleInPrevList.state,
            newState: bundleInNewList.state
          }
        };
        return bundleStateChanged(arg);
      }

      return null;
    }

    if (bundleInNewList && !bundleInPrevList) {
      // return bundle deployed!!!
      return bundleDeployed({ serverId, bundleId: bundleToTrace });
    }

    if (!bundleInNewList && bundleInPrevList) {
      // return bundle removed!!!
      return bundleRemoved({ serverId, bundleId: bundleToTrace });
    }

    return null;
  })
  .filter(x => x !== null);
};

const notifyOnBundleStatusChanged = event$ =>
  event$
    .filter(x => x.type === UPDATE_BUNDLES)
    .groupBy(({ payload: { serverId } }) => serverId)
    .flatMap(group => group
        .pairwise()
          .map(([x, y]) => ({
            serverId: x.payload.serverId,
            prevItems: x.payload.items,
            newItems: y.payload.items }))
          .flatMap(x => getMetaInf({ serverId: x.serverId, key: BUNDLES_WATCHING_META_KEY })
              .map(meta => ({
                ...x,
                bundlesToTrace: meta || []
              })))
          .map(({ serverId, prevItems, newItems, bundlesToTrace }) => ({
            serverId,
            prevItems: prevItems.filter(item => bundlesToTrace.findIndex(y => y === item.id) > -1),
            newItems: newItems.filter(item => bundlesToTrace.findIndex(y => y === item.id) > -1),
            bundlesToTrace
          }))
          .map(({ serverId, prevItems, newItems, bundlesToTrace }) => compareBundles({
            serverId,
            prevItems,
            newItems,
            traceItems: bundlesToTrace }))
          .flatMap(x => Rx.Observable.of.apply(null, x)));

export default event$ => Rx.Observable.merge(
  watchBundleEpic(event$),
  notifyOnBundleStatusChanged(event$)
);
