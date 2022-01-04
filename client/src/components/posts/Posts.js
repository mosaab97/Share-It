import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react'
import {useSelector} from 'react-redux'
import Post from './post/Post'
import useStyles from './styles';

function Posts({setCurrentId}) {
    const { posts, loading } = useSelector((state) => state.posts);
    const classes = useStyles()

    if(!posts?.length && !loading) return "No Posts"
    return (
        loading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {
                    posts.map(post =>(
                        <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))
                }

            </Grid>
        )
    )
}

export default Posts
