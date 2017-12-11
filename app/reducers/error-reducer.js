import { ERROR } from './../actions';

export default (state = [], action) => {
  switch (action.type) {
    case ERROR:
      return [...state, action.payload ? action.payload.error : action.error];
    default:
      return state;
  }
};
