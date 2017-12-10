import {SHOW_NEW_SERVER_FORM, HIDE_NEW_SERVER_FORM} from './../actions'

export default (state = false, action) => {
    if (action.type === SHOW_NEW_SERVER_FORM){
        return true;
    } else if(action.type === HIDE_NEW_SERVER_FORM){
        return false;
    }
    return state;
}