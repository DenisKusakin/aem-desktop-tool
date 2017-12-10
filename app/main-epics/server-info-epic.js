// import {
//     UPDATE_SERVER_STATUS,
//     SERVER_STATUS_UPDATED
// } from './constants.js'

import {serverStatus, serverInfo} from './../sling-api'
//import fetchServerInfo from './../sling-api/server-info.js'
import {findServers} from './../db'
import Rx from 'rxjs/Rx';
import {
    serverInfoFulfilled,
    FETCH_SERVERS,
    error,
    ERROR
} from './../actions'

const fetchServerInfoEpic = event$ => 
        event$
            .filter(x => x.type === FETCH_SERVERS)
            .flatMap( () => findServers({}) )
            // .do(x => console.log(JSON.stringify(x)))
            .flatMap( ({id, host, login, password}) => 
                serverInfo({host, login, password})
                    // .do(x => console.log(JSON.stringify(x)))
                    .map( ({time, data}) => ({
                        id,
                        time,
                        data
                    }))
                    .catch( e => Rx.Observable.of(error(e)))
            )
            .map( x => {
                    if(x.type === "ERROR"){
                        return x
                    }
                    let {id, time, data} = x
                    return serverInfoFulfilled(id, data, time)
                }
            )

export default fetchServerInfoEpic