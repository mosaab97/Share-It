import React, { useEffect, useState } from 'react'
import { Button, Paper, TextField, Typography } from '@material-ui/core'
import FileBase from 'react-file-base64'
import {useDispatch, useSelector} from 'react-redux'

import useStyles from './styles';
import { createPost, updatePost } from '../../redux/actions/posts';
import { useNavigate } from 'react-router-dom';

const initState = {title: '', message: '', tags: '', selectedFile: ''}

function Form({currentId, setCurrentId}) {
    const [postData, setPostData] = useState(initState)
    const post = useSelector((state) => currentId ? state.posts.posts.find(p => p._id === currentId)  : null)
    const classes = useStyles()
    const dispatch = useDispatch();
    const naviagte = useNavigate()
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}))
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name}, naviagte))
            
        }
        clear()
    }

    const handleChange = (e) => {
        if(e.target.name === 'tags') {
            setPostData({...postData, [e.target.name]: e.target.value.split(',')})
        } else {
            setPostData({...postData, [e.target.name]: e.target.value})
        }
    }

    const clear = () => {
        setCurrentId(null)
        setPostData(initState)
    }

    if(!user?.result?.name) {
        return <Paper className={classes.paper} elevation={6}>
            <Typography variant='h6' algin='center'>
                Please sign in to share feeds or like it 
            </Typography>
        </Paper>
    }
    return (
        <Paper className={`${classes.root} ${classes.paper}`} elevation={6}>
            <form autoComplete='off' className={classes.form} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Edit' : 'Share Somthing'}</Typography>
                <TextField required name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={handleChange}/>
                <TextField required name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={handleChange}/>
                <TextField required name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={handleChange}/>
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})} 
                    />
                </div>

                <Button className={classes.buttonSubmit} variant='contained' color="primary" size="large" type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form
