import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {Grid, Paper, Button, Typography} from '@material-ui/core';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import TextField from '../TextField';

import {authService} from '../../utils/authService';
import {userActions} from '../../store/actions/userActions';
import {alertActions} from '../../store/actions/alertActions';

import GoogleLogin from 'react-google-login';
import googleLogo from '../../assets/google.svg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '90%',
            height: '90%',
        },
        form: {
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 3, 0),
            padding: theme.spacing(1),
            borderRadius: 10,
            textTransform: 'none',
            fontWeight: 550,
            fontFamily: 'Arial',
            color: 'white',
        },
    })
);

export default (props: {close: () => void}) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    // const [signinFailed, setSigninFailed] = useState(false);
    const [userName, setUserName] = useState('');
    // const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState('');

    const onSignInHandler = async () => {
        try {
            const user = await authService.login(userName, userPassword);
            dispatch(userActions.login(user));
            dispatch(alertActions.success('sign in succeed'));
            setTimeout(() => {
                history.push('/explore');
            }, 50);
            props.close();
        } catch (error) {
            dispatch(alertActions.error(error, 'sign in failed'));
        }
    };

    const responseGoogle = (response: any) => {
        console.log(response);
    };

    return (
        <Paper elevation={0} className={classes.paper}>
            <Typography variant="h4" align="center">
                Welcome Back.
            </Typography>
            <form className={classes.form}>
                <TextField
                    label="Username"
                    setState={setUserName}
                    required={true}
                />
                <TextField
                    label="Password"
                    setState={setUserPassword}
                    required={true}
                    type={'password'}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    size="large"
                    onClick={onSignInHandler}
                >
                    Sign in
                </Button>

                <Grid container spacing={2}>
                    {/*<Grid item xs={12}>*/}
                    {/*    <GoogleLogin*/}
                    {/*        clientId="1079841086908-gqndjb0tl4np1s0ripbed859638n5ajc.apps.googleusercontent.com"*/}
                    {/*        buttonText="Login"*/}
                    {/*        onSuccess={responseGoogle}*/}
                    {/*        onFailure={responseGoogle}*/}
                    {/*        cookiePolicy={'single_host_origin'}*/}
                    {/*        style={{width: '100%'}}*/}
                    {/*        render={(renderProps) => (*/}
                    {/*            <Button*/}
                    {/*                fullWidth*/}
                    {/*                onClick={renderProps.onClick}*/}
                    {/*                disabled={renderProps.disabled}*/}
                    {/*                style={{*/}
                    {/*                    textTransform: 'none',*/}
                    {/*                    borderRadius: 20,*/}
                    {/*                    background: 'white',*/}
                    {/*                }}*/}
                    {/*                variant="contained"*/}
                    {/*                startIcon={*/}
                    {/*                    <img*/}
                    {/*                        src={googleLogo}*/}
                    {/*                        style={{width: '1rem'}}*/}
                    {/*                        alt="google"*/}
                    {/*                    ></img>*/}
                    {/*                }*/}
                    {/*            >*/}
                    {/*                Login with google*/}
                    {/*            </Button>*/}
                    {/*        )}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            style={{textTransform: 'none'}}
                            onClick={() => {
                                history.push('/?sign-up=true');
                                // @ts-ignore
                                window.location.reload();
                            }}
                        >
                            Sign up
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            style={{textTransform: 'none'}}
                            onClick={() => {
                                history.push('/forget-password');
                            }}
                        >
                            Forgot password?
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <br />
            <br />
        </Paper>
    );
};
