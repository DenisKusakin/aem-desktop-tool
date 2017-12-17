import Rx from 'rxjs/Rx';
import { setMetaInf, getMetaInf } from './../db';
import {
  BUNDLE_START_WATCHING,
  BUNDLE_STOP_WATCHING,
  UPDATE_BUNDLES,
  SHOW_BUNDLE_DISABLED_NOTY,
  BUNDLE_STATE_CHANGED,
  bundleStateChanged,
  bundleDeployed,
  bundleRemoved,
  showBundleDisabledNoty
} from './../actions';

const BUNDLES_WATCHING_META_KEY = 'bundlesWatched';

const watchBundleEpic = event$ =>
  event$
    .filter(x => x.type === BUNDLE_START_WATCHING || x.type === BUNDLE_STOP_WATCHING)
    .flatMap(({ type, payload: { serverId, bundleId } }) =>
      getMetaInf({ serverId, key: BUNDLES_WATCHING_META_KEY })
        .map(meta => ({ meta, serverId, bundleId, type }))
    )
    .flatMap(({ type, meta, serverId, bundleId }) => {
      const filteredMeta = (meta || []).filter(x => x !== bundleId);
      return setMetaInf({
        serverId,
        key: BUNDLES_WATCHING_META_KEY,
        data: type === BUNDLE_START_WATCHING ? [...filteredMeta, bundleId] : filteredMeta
      });
    })
    .filter(() => false);

const evaluateDisabledBundles = ({ serverId, items, bundlesToTrace }) =>
  Rx.Observable.of.apply(null, items)
    .filter(x => bundlesToTrace.findIndex(y => y === x.id) > -1)
    .filter(x => x.stateRaw !== 32)
    .map(x => showBundleDisabledNoty({ serverId, bundleId: x.id }));

const compareBundles = ({ serverId, prevItems, newItems, traceItems }) =>
    Rx.Observable.of.apply(null, traceItems)
    .flatMap(bundleToTrace => {
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
              newState: bundleInNewList.state,
              prevStateRaw: bundleInPrevList.stateRaw,
              newStateRaw: bundleInNewList.stateRaw
            }
          };
          return Rx.Observable.of(bundleStateChanged(arg));
        }

        return Rx.Observable.empty();
      }

      if (bundleInNewList && !bundleInPrevList) {
        // return bundle deployed!!!
        return Rx.Observable.of(bundleDeployed({ serverId, bundleId: bundleToTrace }));
      }

      if (!bundleInNewList && bundleInPrevList) {
        // return bundle removed!!!
        return Rx.Observable.of(bundleRemoved({ serverId, bundleId: bundleToTrace }));
      }

      return Rx.Observable.empty();
    });

// const notifyOnBundleDisabled = event$ =>
//   event$
//     .filter(x => x.type === UPDATE_BUNDLES)
//     .groupBy(({ payload: { serverId } }) => serverId)
//     .flatMap(group => group
//         .map(x => ({
//           serverId: x.payload.serverId,
//           items: x.payload.items }))
//         .flatMap(x => getMetaInf({ serverId: x.serverId, key: BUNDLES_WATCHING_META_KEY })
//           .map(meta => ({
//             ...x,
//             bundlesToTrace: meta || []
//           })))
//         .flatMap(({ serverId, items, bundlesToTrace }) => evaluateDisabledBundles({ serverId, items, bundlesToTrace }))
//     );

const notifyOnBundleDisabledv2 = event$ =>
  Rx.Observable.merge(
    event$
      .filter(x => x.type === BUNDLE_STATE_CHANGED && x.payload.data.prevStateRaw === 32)
      .map(({ payload: { serverId, bundleId } }) => showBundleDisabledNoty({ serverId, bundleId })),
    event$
      .filter(x => x.type === UPDATE_BUNDLES)
      .groupBy(({ payload: { serverId } }) => serverId)
      .flatMap(group => group
        .map(x => ({
          serverId: x.payload.serverId,
          items: x.payload.items }))
        .flatMap(x => getMetaInf({ serverId: x.serverId, key: BUNDLES_WATCHING_META_KEY })
          .map(meta => ({
            ...x,
            bundlesToTrace: meta || []
          }))
        )
        .flatMap(({ serverId, items, bundlesToTrace }) => evaluateDisabledBundles({ serverId, items, bundlesToTrace }))
        .groupBy(({ payload: { bundleId } }) => bundleId)
          .flatMap(bundleGroup => bundleGroup.first())
      )
  );

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
        .flatMap(({ serverId, prevItems, newItems, bundlesToTrace }) => compareBundles({
          serverId,
          prevItems,
          newItems,
          traceItems: bundlesToTrace }))
    );

export default event$ => Rx.Observable.merge(
  watchBundleEpic(event$),
  notifyOnBundleStatusChanged(event$),
  // notifyOnBundleDisabled(event$)
  notifyOnBundleDisabledv2(event$)
);
