import {ipcRenderer } from 'electron'
import Rx from 'rxjs/Rx';
import {getObservableFromEventEmitter} from './ipc-helpers.js'
import { 
    PUSH_TO_MAIN_PROCESS, 
    PUSH_TO_RENDERER_PROCESS
} from './constants.js'

const pushToMainProcess = arg => ipcRenderer.send(PUSH_TO_MAIN_PROCESS, arg)

export default {
    getMainProcessEvents: getObservableFromEventEmitter(ipcRenderer, PUSH_TO_RENDERER_PROCESS),
    pushToMainProcess
}