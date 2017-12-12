import { CHANGE_BOTTOM_NAVIGATION } from './../actions/search-actions';

const INITIAL_STATE = {
  current: 0
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === CHANGE_BOTTOM_NAVIGATION) {
    return {
      ...state,
      current: action.payload.newIndex
    };
  }
  return state;
}
