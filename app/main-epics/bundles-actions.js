import Rx from 'rxjs/Rx';
import { findServers } from './../db';
import { bundlesList, stopBundle, startBundle, startComponent, stopComponent, componentsList } from './../sling-api';
import {
  START_BUNDLE,
  STOP_BUNDLE,
  UPDATE_BUNDLES_INTENT,
  START_COMPONENT,
  STOP_COMPONENT,
  UPDATE_COMPONENTS,
  BUNDLE_ACTION_FULFILLED,
  UPDATE_COMPONENTS_INTENT,
  updateBundlesIntent,
  bundleActionFulfilled,
  updateBundles,
  updateComponentsIntent,
  componentActionFulfilled,
  updateComponents
} from './../actions';

const updateBundlesEpic = event$ =>
  event$
    .filter(x => x.type === UPDATE_BUNDLES_INTENT)
    .flatMap(({ payload: { serverId } }) =>
      findServers({ _id: serverId })
        .map(({ host, login, password }) => ({ host, login, password, serverId }))
    )
    .flatMap(({ host, login, password, serverId }) =>
      bundlesList({ host, login, password })
        .map(({ time, data }) => {
          const items = data.data;
          return updateBundles({ serverId, items, time });
        })
    );

const updateComponentsEpic = event$ =>
  event$
    .filter(x => x.type === UPDATE_COMPONENTS_INTENT)
    .flatMap(({ payload: { serverId } }) =>
      findServers({ _id: serverId })
        .map(({ host, login, password }) => ({ host, login, password, serverId }))
    )
    .flatMap(({ host, login, password, serverId }) =>
      componentsList({ host, login, password })
        .map(({ time, data }) => {
          const items = data.data;
          return updateComponents({ serverId, items, time });
        })
    );

const refreshComponentOnBundleActionFulfilled = event$ =>
  event$
    .filter(x => x.type === BUNDLE_ACTION_FULFILLED)
    .groupBy(({ payload: { serverId } }) => serverId)
    .flatMap(group =>
      group
        .throttleTime(2 * 1000)
        .map(({ payload: { serverId } }) => updateComponentsIntent({ serverId }))
    );

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
          .map(x => ({ serverId, type, bundleId }));
      }
      return stopBundle({ host, login, password })(bundleId)
        .map(x => ({ serverId, type, bundleId }));
    })
    .flatMap(({type, serverId, bundleId}) => Rx.Observable.of(bundleActionFulfilled({
      type,
      serverId,
      bundleId
    }), updateBundlesIntent({serverId})));

const componentActions = event$ =>
  event$
    .filter(x => x.type === START_COMPONENT || x.type === STOP_COMPONENT)
    .flatMap(({ type, payload: { serverId, componentId } }) =>
      findServers({ _id: serverId })
        .map(({ host, login, password }) => ({ type, host, login, password, componentId, serverId }))
    )
    .flatMap(({ type, host, login, password, componentId, serverId }) => {
      if (type === START_COMPONENT) {
        return startComponent({ host, login, password })(componentId)
          .map(x => ({ ...x, serverId, type, componentId }));
      }
      return stopComponent({ host, login, password })(componentId)
        .map(x => ({ ...x, serverId, type, componentId }));
    })
    .flatMap(({ type, serverId, componentId, data, time }) => {
      try {
        if (type === START_COMPONENT) {
          return Rx.Observable.of(updateComponents({
            serverId,
            items: data ? data.data : [],
            time
          }), componentActionFulfilled({ type, serverId, componentId }));
        } else {
          return Rx.Observable.of(updateComponentsIntent({ serverId }), componentActionFulfilled({
            type,
            serverId,
            componentId
          }));
        }
      } catch (e) {
        return Rx.Observable.of();
      }
    });

export default event$ => Rx.Observable.merge(
  bundlesActions(event$),
  updateBundlesEpic(event$),
  componentActions(event$),
  updateComponentsEpic(event$),
  refreshComponentOnBundleActionFulfilled(event$)
);
