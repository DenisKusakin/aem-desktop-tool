import { UPDATE_COMPONENTS, START_COMPONENT, STOP_COMPONENT, COMPONENT_ACTION_FULFILLED } from './../actions/components-actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  if (action.type === UPDATE_COMPONENTS) {
    const { payload: { serverId, items, time } } = action;
    return {
      ...state,
      [serverId]: {
        time,
        items
      }
    };
  } else if (action.type === START_COMPONENT || action.type === STOP_COMPONENT) {
    const { payload: { serverId, componentId } } = action;
    return {
      ...state,
      [serverId]: {
        time: state[serverId].time,
        items: state[serverId].items.map(x => {
          if (x.actionId === componentId) {
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
  } else if (action.type === COMPONENT_ACTION_FULFILLED) {
    const { payload: { serverId, componentId } } = action;
    return {
      ...state,
      [serverId]: {
        time: state[serverId].time,
        items: state[serverId].items.map(x => {
          if (x.actionId === componentId) {
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
