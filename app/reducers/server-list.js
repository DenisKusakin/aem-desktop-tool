import {
    HIDE_DRAWER,
    SHOW_DRAWER,
    ADD_SERVER,
    REMOVE_SERVER_FULFILLED,
    UPDATE_SERVER_STATUS,
    SERVER_INFO_FULFILLED,
    UPDATE_SERVER_STATUS_ERROR
} from '../actions'

export default (state = {items: []}, action) => {
    switch(action.type) {
        case SHOW_DRAWER: 
            return {
                ...state,
                drawerOpen: true
            }
        case HIDE_DRAWER: 
            return {
                ...state,
                drawerOpen: false
            }
        case ADD_SERVER:
            let {name, id} = action.payload
            let lastStatus = action.payload.lastStatus
            if(state.items.find(x => x.id ===id)){
                return state
            }
            return {
                ...state,
                items: [...state.items, {
                    name,
                    id,
                    lastStatus: lastStatus
                }]
            }
        case REMOVE_SERVER_FULFILLED:
            
            return {
                ...state,
                items: state.items.filter(x => x.id !== action.payload.id)
            }
        case UPDATE_SERVER_STATUS:
            
            return {
                ...state,
                items: state.items.map( x => {
                    if(x.id === action.payload.id){
                        return {
                            ...x,
                            lastStatus: {...action.payload.lastStatus}
                        }
                    }
                    return {...x}
                })
            }
        case UPDATE_SERVER_STATUS_ERROR:
            return {
                ...state,
                items: state.items.map(x => {
                    if(x.id === action.payload.id){
                        return {
                            ...x,
                            lastStatus: {
                                error: {...action.payload.error},
                                time: action.payload.time
                            }
                        }
                    }
                    return {...x}
                })
            }
        case SERVER_INFO_FULFILLED: 
            let newItems = [...state.items]
            let itemToUpdate = newItems.find(x => x.id === action.payload.id)
            if(!!itemToUpdate){
                itemToUpdate.info = {
                    time: action.payload.time,
                    data: action.payload.data
                }
            }
            return {
                ...state,
                items: newItems
            }
        default: return state
    }    
}