export default store => {
    let id = store.serverInfoDialog.id
    if(!id){
        return {
            data: null
        }
    }
    let serverData = store.servers.items.find(x => x.id === id)
    if(!!serverData){
        if(!!serverData.info){
            return {
                data: serverData.info.data,
                time: serverData.info.time
            }
        }
    }
    return {
        data: null
    }
}