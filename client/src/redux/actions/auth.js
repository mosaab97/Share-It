import * as servers from '../../services';
import { AUTH } from '../../constants/actionTypes'
import { setAlertMsg } from './alert';

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await servers.signup(formData);
        dispatch({type: AUTH, payload: data})
        navigate('/');
    } catch(error) {
        dispatch(setAlertMsg('Something went wrong, please try again', 'error'))
    }
}

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await servers.signin(formData);
        dispatch({type: AUTH, payload: data})
        navigate('/');
    } catch(error) {
        dispatch(setAlertMsg('Something went wrong, please try again', 'error'))
    }
}