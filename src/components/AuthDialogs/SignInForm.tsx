import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {Grid, Paper, Button, Typography} from '@material-ui/core';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import TextField from '../TextField';

import {authService} from '../../utils/authService';
import {userActions} from '../../store/actions/userActions';
import {alertActions} from '../../store/actions/alertActions';

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
            props.close();
        } catch (error) {
            dispatch(
                alertActions.error(
                    'sign in failed: ' + Object.values(error.response.data.data)
                )
            );
        }
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
                <Grid container>
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
