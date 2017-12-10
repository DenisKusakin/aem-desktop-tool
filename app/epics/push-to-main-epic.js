export default (action$, store, {api: {pushToMainProcess}}) => 
    action$
        //TODO: It looks terrible
        .do(pushToMainProcess)
        // .do(x => console.log("Push to Main", x))
        .filter(() => false)