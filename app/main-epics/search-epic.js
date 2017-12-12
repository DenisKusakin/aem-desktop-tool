import Rx from 'rxjs/Rx';
import { findServers } from './../db';
import { bundlesList, componentsList } from './../sling-api';
import {
  RUN_SEARCH,
  addChunk,
  updateBundles,
  updateComponents
} from './../actions';

const bundlesSearchEpic = event$ =>
  event$
    .filter(x => x.type === RUN_SEARCH)
    .flatMap(({ payload: { serverIds, q, searchId, searchType } }) =>
      Rx.Observable.of.apply(null, serverIds)
        .map(id => ({ id, q, searchId, searchType }))
    )
    .flatMap(({ id, q, searchId, searchType }) =>
      findServers({ _id: id })
        .map(({ host, login, password }) => ({ host, login, password, id, q, searchId, searchType }))
    )
    .flatMap(({ host, login, password, id, q, searchId, searchType }) => {
        if(searchType === 'bundles'){
          return bundlesList({ host, login, password })
            .map(({ time, data }) => {
              const items = data.data;
              return { id, items, time, searchId, q, searchType };
            })
        } else {
          return componentsList({ host, login, password })
            .map(({ time, data }) => {
              const items = data.data;
              return { id, items, time, searchId, q, searchType };
            })
        }
      }
    )
    .flatMap(({ id, time, items, searchId, q, searchType }) => {
      const bundlesFilter = x => x.symbolicName && x.symbolicName.toLowerCase().indexOf(q) > -1;
      const componentsFilter = x => (x.name && x.name.toLowerCase().indexOf(q) > -1) || (x.pid && x.pid.toLowerCase().indexOf(q) > -1);

      const filteredItems = items.filter(searchType === 'bundles' ? bundlesFilter : componentsFilter).map(x => ({ id: x.id }));
      const updateAction = searchType === 'bundles' ? updateBundles({ serverId: id, items, time }) : updateComponents({ serverId: id, items, time })
      return Rx.Observable.of(addChunk(searchId)({ id, time, items: filteredItems }), updateAction);
    });

export default bundlesSearchEpic
