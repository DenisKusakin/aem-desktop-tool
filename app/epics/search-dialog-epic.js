import { combineEpics } from 'redux-observable';

const showDialogOnDoubleShift = (action$, store, { actions: { HOTKEY_DOUBLE_SHIFT, showSearchDialog } }) =>
    action$.ofType(HOTKEY_DOUBLE_SHIFT)
      .filter(() => !!store.getState().searchDialog && !store.getState().searchDialog.open)
      .map(() => showSearchDialog());

const hideDialogOnEsc = (action$, store, { actions: { HOTKEY_ESC, hideSearchDialog } }) =>
  action$.ofType(HOTKEY_ESC)
    .filter(() => !!store.getState().searchDialog && store.getState().searchDialog.open)
    .map(() => hideSearchDialog());

export default combineEpics(showDialogOnDoubleShift, hideDialogOnEsc);
