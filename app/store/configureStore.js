import {getMainProcessEvents} from './../ipc/renderer-process.js'

const wrapConfigureStore = configureStore => () => {
  let store = configureStore()
  getMainProcessEvents()
    .subscribe(store.dispatch)
  return store
}

if (process.env.NODE_ENV === 'production') {
  let {configureStore, history} = require('./configureStore.prod'); // eslint-disable-line global-require
  module.exports = {
    configureStore: wrapConfigureStore(confugureStore), 
    history
  }
} else {
  let {configureStore, history} = require('./configureStore.dev'); // eslint-disable-line global-require
  module.exports = {
    configureStore: wrapConfigureStore(configureStore), 
    history
  }
}
