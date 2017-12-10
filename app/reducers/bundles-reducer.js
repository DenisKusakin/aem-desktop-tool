import { UPDATE_BUNDLES, START_BUNDLE, STOP_BUNDLE, BUNDLE_ACTION_FULFILLED } from './../actions/bundles-actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  if (action.type === UPDATE_BUNDLES) {
    const { payload: { serverId, items, time } } = action;
    return {
      ...state,
      [serverId]: {
        time,
        items
      }
    };
  } else if (action.type === START_BUNDLE || action.type === STOP_BUNDLE) {
    const { payload: { serverId, bundleId } } = action;
    return {
      ...state,
      [serverId]: {
        time: state[serverId].time,
        items: state[serverId].items.map(x => {
          if (x.id === bundleId) {
            return {
              ...x,
              isActionPending: true
            };
          }
          return {
            ...x
          };
        })
      }
    };
  } else if (action.type === BUNDLE_ACTION_FULFILLED) {
    const { payload: { serverId, bundleId } } = action;
    return {
      ...state,
      [serverId]: {
        time: state[serverId].time,
        items: state[serverId].items.map(x => {
          if (x.id === bundleId) {
            return {
              ...x,
              isActionPending: false
            };
          }
          return {
            ...x
          };
        })
      }
    };
  }
  return state;
};
