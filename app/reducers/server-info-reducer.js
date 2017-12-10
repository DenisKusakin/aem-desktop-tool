import {SHOW_SERVER_INFO_DIALOG, HIDE_SERVER_INFO_DIALOG} from './../actions'

export default (state = {id: null, open: false}, action) => {
    switch(action.type) {
        case SHOW_SERVER_INFO_DIALOG: {
            return {
                open: true,
                id: action.payload.id
            }
        }

        case HIDE_SERVER_INFO_DIALOG: {
            return {
                open: false,
                id: null
            }
        }

        default: {
            return state
        } 
    }
}