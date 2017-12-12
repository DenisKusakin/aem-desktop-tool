import { ipcMain, webContents } from 'electron';
import Rx from 'rxjs/Rx';
import {
    PUSH_TO_MAIN_PROCESS,
    PUSH_TO_RENDERER_PROCESS
} from './constants';
import getLogger from './../logger';
import epic from './../main-epics';

const pushToRenderer = item => {
  webContents.getAllWebContents().forEach(x => x.send(PUSH_TO_RENDERER_PROCESS, item));
};

const on = (() => {
  const subscribers = [];
  ipcMain.on(PUSH_TO_MAIN_PROCESS, (event, arg) => {
    subscribers.forEach(subscriber => subscriber(event, arg));
  });
  return subscriber => {
    subscribers.push(subscriber)
    console.log(`Subscribers amount: ${subscribers.length}`)
  }
})()

const getRendererEvents = () => Rx.Observable.create(subscriber => {
  console.log("????")
//  ipcMain.on(PUSH_TO_MAIN_PROCESS, (event, arg) => {
//    subscriber.next(arg);
//  });
  on((event, arg) => {
    subscriber.next(arg);
  })
});

const pushToRendererLogger = getLogger('Push to renderer');
const errorLogger = getLogger('Error: ', 'error.log');
console.log("!!!!!!!")
epic(getRendererEvents())
    .do(x => pushToRendererLogger.info(JSON.stringify(x, null, '\t')))
    .subscribe(pushToRenderer, error => {
      errorLogger.error(error);
      pushToRenderer(error.type ? error : { type: 'ERROR', error });
    });
