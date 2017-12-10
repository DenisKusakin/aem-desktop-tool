import Rx from 'rxjs/Rx';
import {
    BUNDLES_LIST_ENDPOINT
} from './endpoints';

import abstractCall from './abstract-call';
import getLogger from '../logger';

const request = require('request');

const logger = getLogger('Bundles', 'request.log');

const bundlesList = ({ host, login, password }) =>
    abstractCall({ host, login, password })(BUNDLES_LIST_ENDPOINT)
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

const bundleAction = action => ({ host, login, password }) => bundleId => {
  const url = `http://${login}:${password}@${host}/system/console/bundles/${bundleId}?action=${action}`;
  logger.info(`${url}`);

  return Rx.Observable.create(observer => {
    request.post(url, (error, response, body) => {
      if (error) {
        logger.info(`${url}. error: ${error.toString()}`);
        observer.error({ error, type: 'REQUEST_ERROR', time: new Date() });
        return;
      }
      if (response === undefined) {
        logger.info(`${url}. error: response is undefined`);
        observer.error();
        return;
      }
      logger.info(`${url}. success`);
      observer.next({
        response,
        statusCode: response.statusCode,
        time: new Date()
      });
      observer.complete();
    }
    );
  })
    .map(x => {
      if (!x.statusCode === 200) {
        throw {
          time: x.time
        };
      }
      return x;
    });
};

const stopBundle = bundleAction('stop');
const startBundle = bundleAction('start');

export default { bundlesList, startBundle, stopBundle };
