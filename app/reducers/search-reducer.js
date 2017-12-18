import {
  CHANGE_FILTER_CHECKBOX_STATE,
  ADD_SEARCH_RESULT_CHUNK,
  RUN_SEARCH,
  QUERY_FIELD_CHANGE,
  CHANGE_BOTTOM_NAVIGATION,
  CHANGE_FILTER_STATE
} from './../actions/search-actions';
import { REMOVE_SERVER_FULFILLED } from './../actions';

const INITIAL_STATE2 = {
  items: [
    {
      checkboxes: {},
      result: {
        chunks: []
      },
      q: '',
      id: 'bundles',
      label: 'Bundles'
    },
    {
      checkboxes: {},
      result: {
        chunks: []
      },
      q: '',
      id: 'components',
      label: 'Components'
    }
  ],
  current: 0
};

const INITIAL_STATE = {
  checkboxes: {},
  result: {
    chunks: []
  },
  q: '',
  // id: 'components',
  // label: 'Components'
};

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_FILTER_CHECKBOX_STATE:
      return {
        ...state,
        checkboxes: {
          ...state.checkboxes,
          [action.payload.id]: !state.checkboxes[action.payload.id]
        }
      };
    case CHANGE_FILTER_STATE:
      const checkboxes = {};
      action.payload.selectedValues.forEach(x => checkboxes[x] = true);
      return {
        ...state,
        checkboxes
      };
    case REMOVE_SERVER_FULFILLED:
      if (state.checkboxes[action.payload.id]) {
        return {
          ...state,
          checkboxes: {
            ...state.checkboxes,
            [action.payload.id]: false
          },
        };
      }
      return state;
    case ADD_SEARCH_RESULT_CHUNK:
      return {
        ...state,
        result: {
          ...state.result,
          chunks: [...state.result.chunks.filter(x => x.id !== action.payload.id), {
            id: action.payload.id,
            time: action.payload.time,
            items: action.payload.items
          }]
        }
      };
    case QUERY_FIELD_CHANGE:
      return {
        ...state,
        q: action.payload.q
      };
    case RUN_SEARCH:
      return {
        ...state,
        result: {
          ...state.result,
          chunks: action.payload.serverIds.map(id => ({ id, isPending: true, items: [] }))
        }
      };
    default:
      return state;
  }
};

// export default itemReducer;
const reducerv2 = id => (state = INITIAL_STATE, action) => {
  if (action.payload && action.payload.searchId === id) {
    return itemReducer(state, action);
  }
  return state;
};

export default reducerv2;

const rootReducer = (state = INITIAL_STATE2, action) => {
  if (action.type === CHANGE_BOTTOM_NAVIGATION) {
    return {
      ...state,
      current: action.payload.newIndex
    };
  }
  if (!(action.payload && action.payload.searchId !== undefined)) {
    return state;
  }
  const searchId = action.payload.searchId;
  const indexOfSearch = state.items.findIndex(x => x.id === searchId);
  if (indexOfSearch === -1) {
    return state;
  }
  const itemsBefore = state.items.slice(0, indexOfSearch);
  const itemsAfter = state.items.slice(indexOfSearch + 1);
  const item = state.items[indexOfSearch];
  const newItem = itemReducer(item, action);
  const newItems = itemsBefore.concat([{ ...newItem, id: item.id }]).concat(itemsAfter);
  return {
    current: state.current,
    items: newItems
  };
};

// export default rootReducer;
