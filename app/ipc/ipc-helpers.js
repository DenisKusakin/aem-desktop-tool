import Rx from 'rxjs/Rx';

const getObservableFromEventEmitter = (emitter, eventType) => () => {
    return Rx.Observable.create(function (observer) {
        emitter.on(eventType, (event, arg) => {
            observer.next(arg)
        });
    });
}
export default {
    getObservableFromEventEmitter
}