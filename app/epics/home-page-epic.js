import Rx from 'rxjs/Rx';

export default (action$, store, {
        actions: {HOME_PAGE_MOUNT, fetchServers, updateServerStatus}
    }) => 
    action$.ofType(HOME_PAGE_MOUNT)
        .map(fetchServers)
