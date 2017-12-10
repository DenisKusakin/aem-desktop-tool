import { ERROR } from './../actions';

export default (state = [], action) => {
  switch (action.type) {
    case ERROR:
      return [...state, action.payload.error];
    default:
      return state;
  }
};
