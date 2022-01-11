import { SET_ALERT_MSG } from '../../constants/actionTypes'

export const setAlertMsg = (msg, type) => async (dispatch) => {
    dispatch({type: SET_ALERT_MSG, payload: {msg, type}})
}
