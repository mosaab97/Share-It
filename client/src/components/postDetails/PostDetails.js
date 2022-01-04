import React, { useEffect } from 'react'
import { CircularProgress, Divider, Paper, Typography,  } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom'

import useStyles from './styles';
import { getPost, getPostsBySearch } from '../../redux/actions/posts'
import CommentSection from './CommentSection'

function PostDetails() {
    const classes = useStyles();
    const { post, posts, loading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    

    useEffect(() => {
        dispatch(getPost(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if(post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post])

    if(!post) return null

    if(loading) return <Paper elevation={6} className={classes.loadingPaper} ><CircularProgress size='7em' /></Paper>

    const recomendedPosts = posts.filter(({ _id }) => post._id !== _id);

    const openPost = (_id) => navigate(`/posts/${_id}`);
    return (
        <Paper style={{padding: 20, borderRadius: 15}} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                <Typography variant="h3" component="h2">{post.title}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                <Typography variant="h6"><strong>Created by</strong>: {post.name}</Typography>
                <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                <Divider style={{ margin: '20px 0' }} />
                <CommentSection post={post}/>
                <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>

            {recomendedPosts.length > 0 && (
                <div className={classes.section}>
                    <Typography gutterBottom variant='h5'>You might also like</Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recomendedPosts.map(({title, message, name, likes, selectedFile, _id}) => (
                            <div style={{margin: '20px', cursor: 'pointer', width: 200}} onClick={() => openPost(_id)} key={_id}>
                                <Typography variant='h6' gutterBottom>{title}</Typography> 
                                <Typography variant='subtitle2' gutterBottom>{name}</Typography> 
                                <Typography variant='subtitle2' gutterBottom>{message}</Typography> 
                                <Typography variant='subtitle1' gutterBottom>Likes: {likes.length}</Typography> 
                                <img src={selectedFile} width={200} alt='nothing'/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    )
}

export default PostDetails
