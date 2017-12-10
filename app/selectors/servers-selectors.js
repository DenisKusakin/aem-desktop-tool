const serverById = state => id => state.servers.items.find(x => x.id === id)

export default {serverById}