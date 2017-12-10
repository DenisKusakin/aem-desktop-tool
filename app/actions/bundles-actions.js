const START_BUNDLE = 'START_BUNDLE';
const STOP_BUNDLE = 'STOP_BUNDLE';
const UPDATE_BUNDLES = 'UPDATE_BUNDLES';
const UPDATE_BUNDLES_INTENT = 'UPDATE_BUNDLES_INTENT';
const BUNDLE_ACTION_FULFILLED = 'BUNDLE_ACTION_FULFILLED';

const startBundle = ({ serverId, bundleId }) => (
  { type: START_BUNDLE, payload: { serverId, bundleId } });
const stopBundle = ({ serverId, bundleId }) => (
  { type: STOP_BUNDLE, payload: { serverId, bundleId } });
const updateBundles = ({ serverId, items, time }) => (
  { type: UPDATE_BUNDLES, payload: { serverId, items, time } });
const updateBundlesIntent = ({ serverId }) => (
  { type: UPDATE_BUNDLES_INTENT, payload: { serverId } });
const bundleActionFulfilled = ({ serverId, bundleId, type }) => (
  { type: BUNDLE_ACTION_FULFILLED, payload: { serverId, bundleId, type } });

export default {
  START_BUNDLE,
  STOP_BUNDLE,
  UPDATE_BUNDLES,
  BUNDLE_ACTION_FULFILLED,
  UPDATE_BUNDLES_INTENT,
  startBundle,
  stopBundle,
  updateBundles,
  updateBundlesIntent,
  bundleActionFulfilled
};
