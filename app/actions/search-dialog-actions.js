const SHOW_SEARCH_DIALOG = 'SHOW_SEARCH_DIALOG';
const HIDE_SEARCH_DIALOG = 'HIDE_SEARCH_DIALOG';

const showSearchDialog = () => ({ type: SHOW_SEARCH_DIALOG });
const hideSearchDialog = () => ({ type: HIDE_SEARCH_DIALOG });

export default {
  SHOW_SEARCH_DIALOG,
  HIDE_SEARCH_DIALOG,
  showSearchDialog,
  hideSearchDialog
};
