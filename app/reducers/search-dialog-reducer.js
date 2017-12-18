import {
  SHOW_SEARCH_DIALOG,
  HIDE_SEARCH_DIALOG
} from './../actions';

const INITIAL_STATE = {
  open: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_SEARCH_DIALOG:
      return {
        ...state,
        open: true
      };
    case HIDE_SEARCH_DIALOG:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
};
