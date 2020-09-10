import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

//Redux
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/actions/userActions';
import { alertActions } from '../../store/actions/alertActions';
import { userService } from '../../services/userService';
import { MenuItem } from '@material-ui/core';
import PhoneInput from 'react-phone-input-2';

const titles = [
    {
        value: 'Mr.',
        label: 'Mr.',
    },
    {
        value: 'Mrs.',
        label: 'Mrs.',
    },
    {
        value: 'Ms.',
        label: 'Ms.',
    },
    {
        value: 'Miss',
        label: 'Miss',
    },
    {
        value: 'Dr.',
        label: 'Dr.',
    },
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
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
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
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
        signup: {
            margin: theme.spacing(1, 0, 4, 0),
        },
    })
);

export default function SignUp() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [, setSignupFailed] = useState(false);
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
        setSignupFailed(true);
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
            await userService.signup(userInfo);
            const user_payload = await userService.login(
                userInfo.username,
                userInfo.password
            );
            dispatch(userActions.login(user_payload));
            dispatch(alertActions.success('sign up succeed'));
        } catch (error) {
            const err_msg = error.response.data.errors[0].split(',');
            err_msg.forEach((err: any) => {
                dispatch(alertActions.clear());
                dispatch(alertActions.error('sign up failed: ' + err));
            });
        }
    };

    return (
        <main className={classes.layout}>
            <Paper elevation={0}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <div className={classes.signup}>
                        <Typography component='h1' variant='h5'>
                            Sign up
                        </Typography>
                    </div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id='outlined-select-currency'
                                value={userInfo.title}
                                select
                                label='Select Title'
                                fullWidth
                                onChange={(event) =>
                                    handleInput('title', event.target.value)
                                }
                                variant='outlined'
                            >
                                {titles.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id='username'
                                label='Username'
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
                                id='firstName'
                                name='firstName'
                                label='First name'
                                fullWidth
                                autoComplete='given-name'
                                defaultValue={userInfo.firstName}
                                onChange={(event) =>
                                    handleInput('firstName', event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id='lastName'
                                name='lastName'
                                label='Last name'
                                fullWidth
                                autoComplete='family-name'
                                defaultValue={userInfo.lastName}
                                onChange={(event) =>
                                    handleInput('lastName', event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id='email'
                                name='email'
                                label='Email Address'
                                fullWidth
                                autoComplete='Email Address'
                                defaultValue={userInfo.email}
                                onChange={(event) =>
                                    handleInput('email', event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id='password'
                                name='password'
                                label='Password (with minimum eight characters)'
                                fullWidth
                                autoComplete='Password'
                                onChange={(event) =>
                                    handleInput('password', event.target.value)
                                }
                                error={!checkPassword()}
                                defaultValue={userInfo.password}
                                type='password'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id='repassword'
                                name='repassword'
                                label='Please Re-Enter your Password'
                                fullWidth
                                autoComplete='Re-Enter Password'
                                type='password'
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

                        {/* <Grid item xs={12}>
              <TextField
                id="role"
                select
                fullWidth
                label="Which role can best describe you?"
                onChange={this.props.handle("role")}
                value={this.props.info.role}
                variant="outlined"
              >
                {this.roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}
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
                                variant='contained'
                                className={classes.buttonDisabled}
                                disabled
                                fullWidth
                                color='secondary'
                            >
                                {' '}
                                Please complete the registered form.
                            </Button>
                        ) : (
                            <Button
                                variant='contained'
                                className={classes.button}
                                onClick={onSignUpHandler}
                                color='secondary'
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
                                Register
                            </Button>
                        )}
                    </div>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Link href='/sign-in' variant='body2'>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </main>
    );
}
