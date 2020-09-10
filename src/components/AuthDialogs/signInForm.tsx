import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { userService } from '../../services/userService';
import TextField from './textField';

import { useDispatch } from 'react-redux';
import { userActions } from '../../store/actions/userActions';
import { alertActions } from '../../store/actions/alertActions';
import { Link } from 'react-router-dom';

// Extension Styles
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

export default (props: { close: () => void }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    // const [signinFailed, setSigninFailed] = useState(false);
    const [userName, setUserName] = useState('');
    // const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState('');

    const onSignUpHandler = async () => {
        try {
            const user = await userService.login(userName, userPassword);
            dispatch(userActions.login(user));
            dispatch(alertActions.success('log in succeed'));
            props.close();
        } catch (error) {
            dispatch(
                alertActions.error(
                    'log in failed: ' + error.response.data.errors
                )
            );
        }
    };

    return (
        <Paper elevation={0} className={classes.paper}>
            <Typography variant='h4' align='center'>
                Welcome Back.
            </Typography>
            <form className={classes.form}>
                <TextField
                    label='user name'
                    setState={setUserName}
                    required={true}
                />
                <TextField
                    label='Password'
                    setState={setUserPassword}
                    required={true}
                    type={'password'}
                />

                <Button
                    fullWidth
                    variant='contained'
                    color='secondary'
                    className={classes.submit}
                    size='large'
                    onClick={onSignUpHandler}
                >
                    Login
                </Button>
                <Grid container>
                    <Grid item xs={12}>
                        <Link to='/forget-password'>
                            <Button fullWidth style={{ textTransform: 'none' }}>
                                Forgot password?
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </form>
            <br />
            <br />
        </Paper>
    );
};
