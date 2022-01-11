import {combineReducers} from 'redux'
import posts from './posts'
import auth from './auth'
import alert from './alert'

export default combineReducers({
    posts,
    auth,
    alert
})