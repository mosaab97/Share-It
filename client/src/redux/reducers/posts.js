import { FETCH_ALL, DELETE, UPDATE, CREATE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST, COMMENT, EMPTY_POST_DATA } from '../../constants/actionTypes'

const reducer = (state = {loading: true, posts: []}, action) => {
    switch(action.type) {
        case START_LOADING:
            return { ...state, loading: true };
        case END_LOADING:
            return { ...state, loading: false };
        case FETCH_ALL:
            return {
                ...state, 
                posts: action.payload.data, 
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case FETCH_POST:
            return { ...state, post: action.payload };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case CREATE:
            return {...state, posts: [...state.posts, action.payload] };
        case UPDATE:
        case COMMENT:
            return {...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) };
        case DELETE:
            return {...state, posts: state.posts.filter(post => post._id !== action.payload) };
        case EMPTY_POST_DATA:
            return { ...state, post: null};
        default:
            return state;
    }
}

export default reducer

