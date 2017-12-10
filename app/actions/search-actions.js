const CHANGE_FILTER_CHECKBOX_STATE = 'CHANGE_FILTER_CHECKBOX_STATE';
const ADD_SEARCH_RESULT_CHUNK = 'ADD_SEARCH_RESULT_CHUNK';
const RUN_SEARCH = 'RUN_SEARCH';
const QUERY_FIELD_CHANGE = 'QUERY_FIELD_CHANGE';
const CHANGE_BOTTOM_NAVIGATION = 'CHANGE_BOTTOM_NAVIGATION';

const changeCheckboxState = searchId => id => ({ type: CHANGE_FILTER_CHECKBOX_STATE, payload: { searchId, id } });
const addChunk = searchId => ({ id, time, items }) => ({ type: ADD_SEARCH_RESULT_CHUNK, payload: { searchId, id, time, items } });
const runSearch = searchId => ({ q, serverIds }) => ({ type: RUN_SEARCH, payload: { q, serverIds, searchId } });
const changeQueryField = searchId => q => ({ type: QUERY_FIELD_CHANGE, payload: { q, searchId } });
const changeBottomNavigation = newIndex => ({ type: CHANGE_BOTTOM_NAVIGATION, payload: { newIndex } });

export default {
  CHANGE_FILTER_CHECKBOX_STATE,
  ADD_SEARCH_RESULT_CHUNK,
  RUN_SEARCH,
  runSearch,
  addChunk,
  changeCheckboxState,
  QUERY_FIELD_CHANGE,
  changeQueryField,
  CHANGE_BOTTOM_NAVIGATION,
  changeBottomNavigation
};
