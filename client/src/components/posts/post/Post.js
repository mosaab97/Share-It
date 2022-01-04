import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom'
import { Button, Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core';
import { MoreHoriz, ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons'
import moment from 'moment'
import { deletePost, likePost } from '../../../redux/actions/posts';
import useStyles from './styles';
import { EMPTY_POST_DATA } from '../../../constants/actionTypes';

function Post({post, setCurrentId}) {
    const [likes, setLikes] = useState(post?.likes);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles()

    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user?.result?.googleId || user?.result?._id

    const openPostPage = () => {
        dispatch({type: EMPTY_POST_DATA})
        navigate(`/posts/${post._id}`)
    }

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAlt fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const handleLike = () => {
        dispatch(likePost(post._id))

        if(post.likes.find((like) => like === userId)) {
            setLikes(post.likes.filter(id => id !== userId))
        } else {
            setLikes([...post.likes, userId])
        }
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} component="span" onClick={openPostPage}>
                <CardMedia 
                    className={classes.media} 
                    image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
                    title={post.title}
                />
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.name}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {
                    (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                        <div className={classes.overlay2} name="edit">
                            <Button style={{color: 'white'}} size="small" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentId(post._id)
                                }}
                            >
                                <MoreHoriz fontSize='medium' />
                            </Button>
                        </div>
                }
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary' component='h2'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>

                <CardContent>
                    <Typography variant='body2'color="textSecondary" component='p'>{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            
            <CardActions className={classes.cardActions}>
                <Button color="primary" size="small" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {
                    (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                    <Button color="secondary" size="small" onClick={() => dispatch(deletePost(post._id))}>
                        Delete
                    </Button>
                }
            </CardActions>
        </Card>
    )
}

export default Post
