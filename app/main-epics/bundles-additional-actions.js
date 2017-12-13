import Rx from 'rxjs/Rx';
import { setMetaInf, getMetaInf } from './../db';
import {
  BUNDLE_START_WATCHING,
  BUNDLE_STOP_WATCHING
} from './../actions';

const watchBundlesEpic = event$ =>
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

export default
