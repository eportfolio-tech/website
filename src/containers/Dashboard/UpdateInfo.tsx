import React, {useEffect, useRef, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
    Avatar,
    Button,
    Grid,
    TextField,
    IconButton,
    Tooltip,
    Typography,
} from '@material-ui/core';

import {useDispatch} from 'react-redux';
import {authService} from '../../utils/authService';
import {alertActions} from '../../store/actions/alertActions';

import {userService} from '../../utils/userService';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: theme.palette.background.default,
            marginTop: theme.spacing(5),
        },
        resetButton: {
            marginTop: theme.spacing(3),
            marginRight: theme.spacing(2),
            textTransform: 'none',
        },
        cardTitle: {
            marginTop: theme.spacing(3),
        },
        cardTitleIcon: {
            marginTop: theme.spacing(3),
        },
        large: {
            width: theme.spacing(20),
            height: theme.spacing(20),
            margin: 'auto',
        },
        saveButton: {
            marginTop: theme.spacing(3),
            // height: '100%',
            marginRight: theme.spacing(2),
            textTransform: 'none',
        },
    })
);

export default function UpdateProfile() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [userInfo, setUserInfo] = useState<any | null>({});
    const [oldUserInfo, setOldUserInfo] = useState<any | null>({});

    const [avatar, setAvatar] = useState<File | null>(null);
    const isFirstRun = useRef(true);
    //const [avatarUrl, setAvatarUrl] = useState<string>(userInfo.avatarUrl);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        const username = user.user.username;
        authService
            .getInfo(username)
            .then((data) => {
                setUserInfo(data.user);
            })
            .catch((error) => {
                dispatch(alertActions.error(error, 'get info failed'));
            });
        setOldUserInfo(user.user);

        if (isFirstRun.current) {
            isFirstRun.current = false;
            console.log('WC');
            return;
        }
        const onUpload = async () => {
            try {
                const res = await userService.uploadFile(username, avatar);
                handleInput('avatarUrl', res.URI);
                console.log(res.URI);
            } catch (error) {
                dispatch(alertActions.error(error, 'set avatar failed'));
            }
        };
        onUpload();
    }, [avatar, dispatch]);

    const handleInput = (key: any, value: any) => {
        const newUserInfo = {
            ...userInfo,
            [key]: value,
        };
        setUserInfo(newUserInfo);
    };

    const onUpdateHandler = async () => {
        try {
            await authService.updateInfo(userInfo.username, userInfo);
            dispatch(alertActions.success('update succeed'));
        } catch (error) {
            dispatch(alertActions.error(error, 'update failed'));
        }
    };

    const onAvatarChange = async (event: any) => {
        setAvatar(event.target.files[0]);
    };

    // const onSaveHandler = async () => {
    //     user.avatarUrl = avatarUrl;
    //     try {
    //         await authService.updateInfo(user.username, user);
    //         (auth as any).user = user;
    //         dispatch(userActions.update(auth));
    //         dispatch(alertActions.success('set avatar succeed'));
    //     } catch (error) {
    //         dispatch(alertActions.error(error, 'set avatar failed'));
    //         // console.log('error', error);
    //     }
    // };

    const isModified = () => {
        return JSON.stringify(userInfo) !== JSON.stringify(oldUserInfo);
    };

    if (!userInfo.username) return <div />;
    console.log(userInfo);

    return (
        <div className={classes.root}>
            {/* <CardHeader
                avatar={<UpdateIcon className={classes.cardTitleIcon} />}
                title={
                    <Typography variant="h5" className={classes.cardTitle}>
                        Personal info
                    </Typography>
                }
            />
            <Divider /> */}

            <Grid container justify="center" spacing={1}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item>
                            <label
                                htmlFor="upload-photo"
                                style={{margin: 'auto'}}
                            >
                                <input
                                    style={{display: 'none'}}
                                    id="upload-photo"
                                    name="upload-photo"
                                    type="file"
                                    accept=".png,.jpg"
                                    onChange={onAvatarChange}
                                />
                                <Tooltip
                                    placement="top"
                                    title={
                                        <Typography variant="body1">
                                            Edit Avatar
                                        </Typography>
                                    }
                                    arrow
                                >
                                    <IconButton
                                        component="span"
                                        aria-label="add"
                                    >
                                        <Avatar
                                            alt={userInfo.username.toUpperCase()}
                                            src={userInfo.avatarUrl}
                                            className={classes.large}
                                            // style={{borderStyle: 'solid'}}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </label>
                        </Grid>
                    </Grid>
                </Grid>

                {/* <Grid item xs={5}>
                    <Grid
                        container
                        alignItems="center"
                        style={{height: '100%'}}
                    >
                        <Grid item xs={1}>
                            <label
                                htmlFor="upload-photo"
                                style={{margin: 'auto'}}
                            >
                                <input
                                    style={{display: 'none'}}
                                    id="upload-photo"
                                    name="upload-photo"
                                    type="file"
                                    accept=".png,.jpg"
                                    onChange={onAvatarChange}
                                />
                                <Fab
                                    size="large"
                                    component="span"
                                    aria-label="add"
                                >
                                    <AddIcon />
                                </Fab>
                            </label>
                        </Grid>
                    </Grid>
                </Grid> */}
                <Grid item xs={12}>
                    <br />
                </Grid>
                <Grid item xs={10} md={12}>
                    <TextField
                        required
                        id="title"
                        label="Title"
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
                <Grid item xs={10} md={12}>
                    <TextField
                        required
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        value={userInfo.firstName || ''}
                        onChange={(event) =>
                            handleInput('firstName', event.target.value)
                        }
                    >
                        First Name
                    </TextField>
                </Grid>
                <Grid item xs={10} md={12}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        autoComplete="family-name"
                        value={userInfo.lastName || ''}
                        onChange={(event) =>
                            handleInput('lastName', event.target.value)
                        }
                    />
                </Grid>
                <Grid item xs={10} md={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        autoComplete="Email Address"
                        value={userInfo.email || ''}
                        onChange={(event) =>
                            handleInput('email', event.target.value)
                        }
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onUpdateHandler}
                        className={classes.resetButton}
                        disabled={
                            !userInfo.title ||
                            !userInfo.firstName ||
                            !userInfo.lastName ||
                            !userInfo.email ||
                            !isModified()
                        }
                    >
                        {' '}
                        Update
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
