const BUNDLE_START_WATCHING = "BUNDLE_START_WATCHING";
const BUNDLE_STOP_WATCHING = "BUNDLE_STOP_WATCHING";
const UPDATE_BUNDLES_WATCHING_INFO = "UPDATE_BUNDLES_WATCHING_INFO";

const bundleStartWatching = ({ serverId, bundleId }) => (
  { type: BUNDLE_START_WATCHING, payload: { serverId, bundleId } })

const bundleStopWatching = ({ serverId, bundleId }) => (
  { type: BUNDLE_STOP_WATCHING, payload: { serverId, bundleId } })

const bundleStopWatching = ({ serverId, bundleId }) => (
  { type: BUNDLE_STOP_WATCHING, payload: { serverId, bundleId } })

export default {
  BUNDLE_START_WATCHING,
  BUNDLE_STOP_WATCHING,
  UPDATE_BUNDLES_WATCHING_INFO,
  bundleStartWatching,
  bundleStopWatching
}
