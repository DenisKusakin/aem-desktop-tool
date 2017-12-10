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

const getRendererEvents = () => Rx.Observable.create(subscriber => {
  ipcMain.on(PUSH_TO_MAIN_PROCESS, (event, arg) => {
    subscriber.next(arg);
  });
});

const pushToRendererLogger = getLogger('Push to renderer');
const errorLogger = getLogger('Error: ', 'error.log');

epic(getRendererEvents())
    .do(x => pushToRendererLogger.info(JSON.stringify(x, null, '\t')))
    .subscribe(pushToRenderer, error => {
      errorLogger.error(JSON.stringify(error));
      pushToRenderer(error.type ? error : { type: 'ERROR', error });
    });
