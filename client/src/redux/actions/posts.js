import * as servers from '../../services';
import { FETCH_ALL, 
    DELETE, 
    UPDATE, 
    CREATE, 
    FETCH_BY_SEARCH, 
    START_LOADING, 
    END_LOADING,
    FETCH_POST,
    COMMENT
} from '../../constants/actionTypes'

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data} = await servers.fetchPostes(page);
        dispatch({type: FETCH_ALL, payload: data})
        dispatch({type: END_LOADING})

    } catch(error) {
        dispatch({type: END_LOADING})
        console.log(error)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data : { data } } = await servers.fetchPostesBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH, payload: data})
        dispatch({type: END_LOADING})        
    } catch(error) {
        dispatch({type: END_LOADING})
        console.log(error)
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data} = await servers.fetchPost(id);
        dispatch({type: FETCH_POST, payload: data})
        dispatch({type: END_LOADING})

    } catch(error) {
        dispatch({type: END_LOADING})
        console.log(error)
    }
}

export const createPost = (post, naviagte) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data} = await servers.createPost(post);
        naviagte(`/posts/${data._id}`)
        dispatch({type: CREATE, payload: data})
    } catch(error) {
        dispatch({type: END_LOADING})
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await servers.updatePost(id, post);
        dispatch({type: UPDATE, payload: data})
    } catch(error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await servers.deletePost(id);
        dispatch({type: DELETE, payload: id})
    } catch(error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await servers.likePost(id);
        dispatch({type: UPDATE, payload: data})
    } catch(error) {
        console.log(error)
    }
}

export const commentPost = (comment, id) => async (dispatch) => {
    try{
        const {data} = await servers.comment(comment, id)
        dispatch({type: COMMENT, payload: data})
        return data.comments
    } catch(error) {
        console.log(error)

    }

}