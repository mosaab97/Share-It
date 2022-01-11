import { SET_ALERT_MSG } from '../../constants/actionTypes'

const reducer = (state = {msg: '', type: 'success'}, action) => {
    switch(action.type) {
        case SET_ALERT_MSG:{
            return { ...state, msg: action?.payload.msg, type: action?.payload.type};    
        }
        default:
            return state;
    }
}

export default reducer

