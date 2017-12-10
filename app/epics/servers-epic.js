import Rx from 'rxjs/Rx';
import { combineEpics } from 'redux-observable';
import { success } from 'react-notification-system-redux';

const hideDialogOnServerSave = (action$, store, { actions: { addServer, hideNewServerForm, ADD_SERVER } }) =>
    action$.ofType(ADD_SERVER)
        .map(() => hideNewServerForm());

const deleteServerEpic = (action$, store, { actions: { REMOVE_SERVER_FULFILLED, hideDeleteServerForm } }) =>
    action$.ofType(REMOVE_SERVER_FULFILLED)
        .filter(x => x.payload.id === store.getState().removeServerDialog.id)
        .mergeMap(x => Rx.Observable.of(hideDeleteServerForm(), success({ title: 'Server Removed', message: 'Server removed successfully' })));


export default combineEpics(hideDialogOnServerSave, deleteServerEpic);
