import Rx from 'rxjs/Rx';
import { setMetaInf, getMetaInf } from './../db';
import {
  BUNDLE_START_WATCHING,
  BUNDLE_STOP_WATCHING,
  UPDATE_BUNDLES_WATCHING_INFO,
  bundleUpdateWatchingInfo
} from './../actions';

const BUNDLES_WATCHING_META_KEY = 'bundlesWatched';

const startWatchBundleEpic = event$ =>
  event$
    .filter(x => x.type === BUNDLE_START_WATCHING)
    .flatMap(({ payload: { serverId, bundleId } }) =>
      getMetaInf({ serverId, BUNDLES_WATCHING_META_KEY })
    )
    .flatMap(({ host, login, password, serverId }) =>
      bundlesList({ host, login, password })
        .map(({ time, data }) => {
          const items = data.data;
          return updateBundles({ serverId, items, time });
        })
    );

export default
