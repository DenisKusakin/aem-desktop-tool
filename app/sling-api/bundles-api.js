import Rx from 'rxjs/Rx';
import {
    BUNDLES_LIST_ENDPOINT,
    COMPONENTS_ENDPOINT
} from './endpoints';

import abstractCall from './abstract-call';
import getLogger from '../logger';

const request = require('request');

const logger = getLogger('Bundles/Components', 'request.log');

const bundlesList = endpoint => ({ host, login, password }) =>
    abstractCall({ host, login, password })(endpoint)
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

const bundleAction = endpoint => action => ({ host, login, password }) => bundleId => {
  const url = `http://${login}:${password}@${host}${endpoint}/${bundleId}?action=${action}`;
  logger.info(`${url}`);

  return Rx.Observable.create(observer => {
    request.post(url, (error, response, body) => {
      if (error) {
        logger.error(`${url}. error: ${error.toString()}`);
        observer.error({ error, type: 'REQUEST_ERROR', time: new Date() });
        return;
      }
      if (response === undefined) {
        logger.error(`${url}. error: response is undefined`);
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
  })
};

const stopBundle = bundleAction('/system/console/bundles')('stop');
const startBundle = bundleAction('/system/console/bundles')('start');

const componentAction = actionType => arg => componentId => {
  return bundleAction('/system/console/components')(actionType)(arg)(componentId)
          .map(x => ({
              time: x.time,
              statusCode: x.statusCode,
              data: JSON.parse(x.response.body)
            }))
};

const startComponent = componentAction('enable');
const stopComponent = componentAction('disable');

export default {
  bundlesList: bundlesList(BUNDLES_LIST_ENDPOINT),
  startBundle,
  stopBundle,
  componentsList: bundlesList(COMPONENTS_ENDPOINT),
  startComponent,
  stopComponent
};
