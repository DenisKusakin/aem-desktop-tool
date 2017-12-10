const request = require('request');
import Rx from 'rxjs/Rx';
import getLogger from './../logger';

const logger = getLogger('Request', 'request.log');

const abstractCall = ({ host, login, password }) => endpoint => {
  const url = `http://${login}:${password}@${host}${endpoint}`;
  logger.info(`${url}`);

  return Rx.Observable.create(observer => {
    request.get(url, (error, response, body) => {
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
  });
};

export default abstractCall;
