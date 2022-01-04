import { useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom'
import Input from './Input';

import useStyles from './styles'
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import { signin, signup } from '../../redux/actions/auth';

const initState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}
function Auth() {
    
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initState)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmite = (e) => {
        e.preventDefault();
        if(isSignup) {
            dispatch(signup(formData, navigate));
            
        } else {
            dispatch(signin(formData, navigate));

        }
    }

    const handleShowPassword = () => {
        // to get old password use callback function
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const switchMode = () => {
        setIsSignup(!isSignup)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: AUTH, payload: {result, token}})
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    const googleFailure = () => {
        console.log("Google Error")
    }
    return (
        <Container component="main" maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography cariant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmite}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='Last Name' handleChange={handleChange} autoFouce half/>
                                    <Input name='lastName' label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name='email' label="Email Address" handleChange={handleChange} type='email'/>
                        <Input name='password' label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                        {
                            isSignup && <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange} type={'password'} />
                        }
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button> 
                    <GoogleLogin 
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color="primary" fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />}
                                variant='contained'
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
