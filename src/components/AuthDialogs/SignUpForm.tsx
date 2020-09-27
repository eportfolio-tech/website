import React, {useState} from 'react';

import {TextField, Grid, Typography, Button, Paper} from '@material-ui/core';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';

import {authService} from '../../utils/authService';
import {useDispatch} from 'react-redux';
import {userActions} from '../../store/actions/userActions';
import {alertActions} from '../../store/actions/alertActions';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            width: 'auto',
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
                width: 600,
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        paper: {
            marginBottom: theme.spacing(1),
            [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
                marginBottom: theme.spacing(1),
                padding: theme.spacing(2),
            },
        },
        buttons: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        button: {
            margin: theme.spacing(3, 0, 3, 0),
            padding: theme.spacing(1),

            borderRadius: 10,
            textTransform: 'none',
            fontWeight: 550,
            fontFamily: 'Arial',
            color: 'white',
        },
        buttonDisabled: {
            margin: theme.spacing(3, 0, 3, 0),
            padding: theme.spacing(1),

            borderRadius: 10,
            textTransform: 'none',
            fontWeight: 550,
            fontFamily: 'Arial',
        },
    })
);

export default (props: {close: () => void}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState<any | null>({
        password: '',
        title: '',
    });

    const handleInput = (key: any, value: any) => {
        const newUserInfo = {
            ...userInfo,
            [key]: value,
        };
        setUserInfo(newUserInfo);
    };

    const checkPassword = () => {
        if (userInfo.password.length === 0) {
            // to not dispplay error when empty
            return true;
        }
        if (userInfo.password.length < 8) {
            return false;
        }
        if (/\s/.test(userInfo.password)) {
            return false;
        }
        return (
            /[a-z]/.test(userInfo.password) &&
            /[A-Z]/.test(userInfo.password) &&
            /\d/.test(userInfo.password)
        );
    };

    const onSignUpHandler = async () => {
        try {
            await authService.signup(userInfo);
            const user = await authService.login(
                userInfo.username,
                userInfo.password
            );
            dispatch(userActions.login(user));
            dispatch(alertActions.success('sign up succeed'));
            props.close();
        } catch (error) {
            dispatch(alertActions.error(error, 'sign up failed'));
        }
    };

    return (
        <main className={classes.layout}>
            <Paper className={classes.paper} elevation={0}>
                <div>
                    <Typography variant="h6" gutterBottom>
                        Enter Details
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="title"
                                label="Title e.g. Java programmer"
                                variant="outlined"
                                fullWidth
                                value={userInfo.title || ''}
                                onChange={(event) =>
                                    handleInput('title', event.target.value)
                                }
                            >
                                Title
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="username"
                                label="Username"
                                fullWidth
                                required
                                defaultValue={userInfo.username}
                                onChange={(event) =>
                                    handleInput('username', event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="given-name"
                                defaultValue={userInfo.firstName}
                                onChange={(event) =>
                                    handleInput('firstName', event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="family-name"
                                defaultValue={userInfo.lastName}
                                onChange={(event) =>
                                    handleInput('lastName', event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email Address"
                                fullWidth
                                autoComplete="Email Address"
                                defaultValue={userInfo.email}
                                onChange={(event) =>
                                    handleInput('email', event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                label="Password (8 or more characters with upper and lower letters, numbers)"
                                fullWidth
                                autoComplete="Password"
                                onChange={(event) =>
                                    handleInput('password', event.target.value)
                                }
                                error={!checkPassword()}
                                defaultValue={userInfo.password}
                                type="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="repassword"
                                name="repassword"
                                label="Please re-enter your password"
                                fullWidth
                                autoComplete="Re-Enter Password"
                                type="password"
                                onChange={(event) =>
                                    handleInput(
                                        'repassword',
                                        event.target.value
                                    )
                                }
                                defaultValue={userInfo.repassword}
                                error={
                                    userInfo.password !== userInfo.repassword &&
                                    userInfo.password.length !== 0
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PhoneInput
                                country={'au'}
                                enableAreaCodes={false}
                                onChange={(phone) =>
                                    handleInput('phone', phone)
                                }
                                value={userInfo.phone}
                                inputStyle={{
                                    width: '100%',
                                }}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.buttons}>
                        {!userInfo.username ||
                        !userInfo.firstName ||
                        !userInfo.lastName ||
                        !userInfo.email ||
                        !userInfo.password ||
                        !userInfo.repassword ||
                        userInfo.password !== userInfo.repassword ||
                        !checkPassword() ? (
                            <Button
                                variant="contained"
                                className={classes.buttonDisabled}
                                disabled
                                fullWidth
                                color="secondary"
                            >
                                {' '}
                                Please complete sign up form.
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                className={classes.button}
                                onClick={onSignUpHandler}
                                color="secondary"
                                disabled={
                                    !userInfo.username ||
                                    !userInfo.firstName ||
                                    !userInfo.lastName ||
                                    !userInfo.email ||
                                    !userInfo.password ||
                                    !userInfo.repassword ||
                                    userInfo.password !== userInfo.repassword ||
                                    !checkPassword()
                                }
                                fullWidth
                            >
                                Sign up
                            </Button>
                        )}
                    </div>
                </div>
            </Paper>
        </main>
    );
};
