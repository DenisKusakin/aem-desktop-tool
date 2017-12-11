import Rx from 'rxjs/Rx';
import servers from './servers-epic';
import logger from './logger-epic';
import fetchServerInfo from './server-info-epic';
import bundles from './search-epic';
import bundlesActions from './bundles-actions';

const rootEpic = event$ => Rx.Observable.merge(
    servers(event$),
    logger(event$),
    fetchServerInfo(event$),
    bundles(event$),
    bundlesActions(event$)
);

export default rootEpic;
