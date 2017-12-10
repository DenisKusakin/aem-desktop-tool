import {SHOW_DELETE_SERVER_FORM, HIDE_DELETE_SERVER_FORM} from './../actions'

export default (state={id: null}, action) => {
    switch (action.type) {
        case SHOW_DELETE_SERVER_FORM:
            return {
                id: action.payload.id
            }
        case HIDE_DELETE_SERVER_FORM: 
            return {
                id: null
            }
        
        default:
            return state
    }
}