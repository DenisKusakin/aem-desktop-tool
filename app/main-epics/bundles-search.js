import Rx from 'rxjs/Rx';
import { findServers } from './../db';
import { bundlesList } from './../sling-api';
import {
  RUN_SEARCH,
  UPDATE_BUNDLES_INTENT,
  addChunk,
  updateBundles
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

const bundlesSearchEpic = event$ =>
  event$
    .filter(x => x.type === RUN_SEARCH)
    .flatMap(({ payload: { serverIds, q, searchId } }) =>
      Rx.Observable.of.apply(null, serverIds)
        .map(id => ({ id, q, searchId }))
    )
    .flatMap(({ id, q, searchId }) =>
      findServers({ _id: id })
        .map(({ host, login, password }) => ({ host, login, password, id, q, searchId }))
    )
    .flatMap(({ host, login, password, id, q, searchId }) =>
      bundlesList({ host, login, password })
        .map(({ time, data }) => {
          const items = data.data;
          return { id, items, time, searchId, q };
        })
    )
    .flatMap(({ id, time, items, searchId, q }) => {
      const filter = x => x.symbolicName && x.symbolicName.toLowerCase().indexOf(q) > -1;
      const filteredItems = items.filter(filter).map(x => ({ id: x.id }));
      return Rx.Observable.of(addChunk(searchId)({ id, time, items: filteredItems }), updateBundles({ serverId: id, items, time }));
    });

export default event$ => Rx.Observable.merge(
  bundlesSearchEpic(event$),
  updateBundlesEpic(event$)
);
