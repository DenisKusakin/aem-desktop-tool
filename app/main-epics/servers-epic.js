import { serverStatus } from './../sling-api';
import { findServers, persistServer, removeServer } from './../db';
import Rx from 'rxjs/Rx';
import {
    FETCH_SERVERS,
    INTENT_UPDATE_SERVER_STATUS,
    SAVE_NEW_SERVER,
    REMOVE_SERVER,
    addServer,
    updateServerStatus,
    intentUpdateServerStatus,
    removeServerFulfielled,
    updateServerStatusError
} from './../actions';

const serverStatusEpic = event$ =>
    event$
        .merge(Rx.Observable.interval(3 * 1000)
            .flatMap(() => findServers({}).map(({ id, host, login, password }) => intentUpdateServerStatus({ id, host, login, password })))
        )
        .filter(x => x.type === INTENT_UPDATE_SERVER_STATUS)
        .groupBy(({ payload: { id } }) => id)
        .flatMap(group =>
            group
                // Wait for at least 5 sec
                .throttleTime(5 * 1000)
                .flatMap(({ payload: { id, host, login, password } }) =>
                    serverStatus({ host, login, password })
                        .map(({ statusCode, time }) => updateServerStatus(id, { statusCode, time }))
                        .catch(error => Rx.Observable.of(updateServerStatusError(id, error)))
                )
                // .do(x => console.log(JSON.stringify(x)))
        );

const fetchServers = event$ =>
        event$
            .filter(x => x.type === FETCH_SERVERS)
            .flatMap(() => findServers({}))
            .map(({ name, id }) => addServer({ name, id }));

const saveServer = event$ =>
        event$
            .filter(x => x.type === SAVE_NEW_SERVER)
            .flatMap(({ payload: { name, host, login, password } }) =>
                persistServer({ name, host, login, password })
                    .map(({ id, name }) => addServer({ name, id }))
            );

const removeServerEpic = event$ =>
    event$
        .filter(x => x.type === REMOVE_SERVER)
        .flatMap(({ payload: { id } }) =>
            removeServer(id)
                .map(() => removeServerFulfielled(id))
        );

const serversEpic = event$ => Rx.Observable.merge(
    serverStatusEpic(event$),
    fetchServers(event$),
    saveServer(event$),
    removeServerEpic(event$)
);

export default serversEpic;
