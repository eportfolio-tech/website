import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';

import {useDispatch} from 'react-redux';
import {authService} from '../../utils/authService';
import {alertActions} from '../../store/actions/alertActions';

import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(0),
            },
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
    })
);

export default function UpdateProfile() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [userInfo, setUserInfo] = useState<any | null>({});
    const [oldUserInfo, setOldUserInfo] = useState<any | null>({});

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user') || '');
        const username = userInfo.user.username;
        authService
            .getInfo(username)
            .then((data) => {
                setUserInfo(data.user);
            })
            .catch((error) => {
                dispatch(alertActions.error('get info failed'));
            });
        setOldUserInfo(userInfo.user);
    }, [dispatch]);

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
            dispatch(alertActions.error('update failed'));
        }
    };

    const isModified = () => {
        if (JSON.stringify(userInfo) === JSON.stringify(oldUserInfo)) {
            return false;
        }
        return true;
    };

    return (
        <div className={classes.root}>
            <Card style={{height: '100%'}}>
                <CardHeader
                    avatar={<UpdateIcon className={classes.cardTitleIcon} />}
                    title={
                        <Typography variant="h5" className={classes.cardTitle}>
                            Personal info
                        </Typography>
                    }
                />
                <Divider />

                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
                </CardContent>
            </Card>
        </div>
    );
}
