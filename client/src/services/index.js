import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' }) //https://share-it-project1.herokuapp.com/

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

export const fetchPostes = (page) => API.get(`/posts?page=${page}`)
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPostesBySearch = (searchQuery) => API.get(`/posts/search?searchQeury=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)

export const createPost = (newPost) => API.post('/posts', newPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const comment = (comment, id) => API.post(`/posts/${id}/comment`, {comment})


export const signin = (fromData) => API.post(`/user/signin`, fromData)
export const signup = (fromData) => API.post(`/user/signup`, fromData)
