const BUNDLE_START_WATCHING = 'BUNDLE_START_WATCHING';
const BUNDLE_STOP_WATCHING = 'BUNDLE_STOP_WATCHING';
const UPDATE_BUNDLES_WATCHING_INFO = 'UPDATE_BUNDLES_WATCHING_INFO';

const BUNDLE_STATE_CHANGED = 'BUNDLE_STATE_CHANGED';
const BUNDLE_DEPLOYED = 'BUNDLE_DEPLOYED';
const BUNDLE_REMOVED = 'BUNDLE_REMOVED';

const bundleStartWatching = ({ serverId, bundleId }) => (
  { type: BUNDLE_START_WATCHING, payload: { serverId, bundleId } });

const bundleStopWatching = ({ serverId, bundleId }) => (
  { type: BUNDLE_STOP_WATCHING, payload: { serverId, bundleId } });

const bundleUpdateWatchingInfo = ({ serverId, items }) => (
  { type: UPDATE_BUNDLES_WATCHING_INFO, payload: { serverId, items } });

const bundleStateChanged = ({ serverId, bundleId, data }) => (
  { type: BUNDLE_STATE_CHANGED, payload: { serverId, bundleId, data } });

const bundleDeployed = ({ serverId, bundleId }) => (
  { type: BUNDLE_DEPLOYED, payload: { serverId, bundleId } });

const bundleRemoved = ({ serverId, bundleId }) => (
  { type: BUNDLE_REMOVED, payload: { serverId, bundleId } });

export default {
  BUNDLE_START_WATCHING,
  BUNDLE_STOP_WATCHING,
  UPDATE_BUNDLES_WATCHING_INFO,
  BUNDLE_STATE_CHANGED,
  BUNDLE_DEPLOYED,
  BUNDLE_REMOVED,
  bundleStateChanged,
  bundleDeployed,
  bundleRemoved,
  bundleStartWatching,
  bundleStopWatching,
  bundleUpdateWatchingInfo,
};
