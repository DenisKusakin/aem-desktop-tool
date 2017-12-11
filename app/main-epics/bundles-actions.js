import Rx from 'rxjs/Rx';
import { findServers } from './../db';
import { stopBundle, startBundle, startComponent, stopComponent } from './../sling-api';
import {
  START_BUNDLE,
  STOP_BUNDLE,
  UPDATE_BUNDLES_INTENT,
  START_COMPONENT,
  STOP_COMPONENT,
  UPDATE_COMPONENTS,
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
    .flatMap(({ type, serverId, bundleId }) => Rx.Observable.of(bundleActionFulfilled({ type, serverId, bundleId }), updateBundlesIntent({ serverId })));

const componentActions = event$ =>
  event$
    .filter(x => x.type === START_COMPONENT || x.type === STOP_COMPONENT)
    .flatMap(({ type, payload: { serverId, componentId } }) =>
      findServers({ _id: serverId })
        .map(({ host, login, password }) => ({ type, host, login, password, componentId, serverId }))
    )
    .do(x => console.log(JSON.stringify(x)))
    .flatMap(({ type, host, login, password, componentId, serverId }) => {
      if (type === START_COMPONENT) {
        return startComponent({ host, login, password })(componentId)
          .map(x => ({ ...x, serverId, type, componentId }));
      }
      return stopComponent({ host, login, password })(componentId)
        .map(x => ({ ...x, serverId, type, componentId }));
    })
    .do(x => console.log("!!" + x.data))
    .flatMap(({ type, serverId, componentId, data, time }) => {
      try{
        return Rx.Observable.of(updateComponents({ serverId, items: data ? data.data : [], time }),componentActionFulfilled({ type, serverId, componentId }))
      }catch(e){
        console.log(e)
        return Rx.Observable.of()
      }
    });

export default event$ => Rx.Observable.merge(
  bundlesActions(event$),
  updateBundlesEpic(event$),
  componentActions(event$)
);
