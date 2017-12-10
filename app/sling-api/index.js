import Rx from 'rxjs/Rx';
import {
    SERVER_INFO_ENDPOINT,
    HOME_ENDPOINT
} from './endpoints';
import abstractCall from './abstract-call';
import bundlesApi from './bundles-api';

const serverInfoCAll = ({ host, login, password }) =>
    abstractCall({ host, login, password })(SERVER_INFO_ENDPOINT)
        .map(x => {
          if (!x.statusCode === 200) {
            throw {
              time: x.time
            };
          }
          return x;
        })
        .map(x => ({
          time: x.time,
          statusCode: x.statusCode,
          data: JSON.parse(x.response.body)
        }))
        .catch(e => Rx.Observable.of({
          statusCode: -1,
          time: e.time
        }));

const serverStatusCAll = ({ host, login, password }) =>
    abstractCall({ host, login, password })(HOME_ENDPOINT)
        .map(x => {
          if (!x.statusCode === 200) {
            throw ({ time: x.time });
          }
          return x;
        })
        .catch(e => Rx.Observable.of({
          statusCode: -1,
          time: e.time
        }));

export default {
  serverStatus: serverStatusCAll,
  serverInfo: serverInfoCAll,
  ...bundlesApi
};
