import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';
//Redux
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/actions/userActions';
import { alertActions } from '../../store/actions/alertActions';
import { userService } from '../../services/userService';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100vh',
        },
        image: {
            backgroundImage: 'url(/logo.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'light'
                    ? theme.palette.grey[50]
                    : theme.palette.grey[900],
            backgroundSize: 'auto',
            backgroundPosition: 'center',
        },
        paper: {
            margin: theme.spacing(8, 4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    })
);

export default function SignInSide() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    // const [signinFailed, setSigninFailed] = useState(false);
    const [userName, setUserName] = useState('');
    // const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState('');

    const onSignInHandler = async () => {
        try {
            const user = await userService.login(userName, userPassword);
            dispatch(userActions.login(user));
            dispatch(alertActions.success('log in succeed'));
        } catch (error) {
            dispatch(
                alertActions.error(
                    'log in failed: ' + error.response.data.errors
                )
            );
        }
    };

    return (
        <Grid container component='main' className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Login
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            onChange={(event) => {
                                setUserName(event.target.value);
                            }}
                            required={true}
                            fullWidth
                            id='username'
                            label='Username'
                            name='username'
                            autoComplete='username'
                            autoFocus
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            onChange={(event) => {
                                setUserPassword(event.target.value);
                            }}
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                        />
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={onSignInHandler}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href='#' variant='body2'>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href='/sign-up' variant='body2'>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
