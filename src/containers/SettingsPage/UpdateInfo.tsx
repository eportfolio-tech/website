import React, {useState, useEffect} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {
    TextField,
    Grid,
    CardContent,
    Card,
    CardHeader,
    Typography,
    Button,
    MenuItem,
} from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import PublishIcon from '@material-ui/icons/Publish';

import {useDispatch} from 'react-redux';
import {authService} from '../../utils/authService';
import {alertActions} from '../../store/actions/alertActions';

import {titles} from '../../constants/titles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(0),
            },
        },
        resetButton: {
            marginTop: theme.spacing(3),
            height: '100%',
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
    const [userInfo, setUserInfo] = useState<any | null>({firstName: ''});

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user') || '');
        const username = userInfo.username;
        authService
            .getInfo(username)
            .then((data) => {
                setUserInfo(data.user);
            })
            .catch((error) => {
                dispatch(alertActions.error('get info failed: ') + error);
            });
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
            const userInfo = JSON.parse(localStorage.getItem('user') || '');
            const username = userInfo.username;
            await authService.updateInfo(username, userInfo);
            dispatch(alertActions.success('update succeed'));
        } catch (error) {
            dispatch(alertActions.error('update failed: ' + error));
        }
    };

    return (
        <div className={classes.root}>
            <Card style={{height: '100%'}}>
                <CardHeader
                    avatar={<UpdateIcon className={classes.cardTitleIcon} />}
                    title={
                        <Typography variant="h6" className={classes.cardTitle}>
                            Update Your Details
                        </Typography>
                    }
                    action={
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={onUpdateHandler}
                            className={classes.resetButton}
                            disabled={
                                !userInfo.title ||
                                !userInfo.firstName ||
                                !userInfo.lastName ||
                                !userInfo.email
                            }
                        >
                            <PublishIcon />
                            Update
                        </Button>
                    }
                />

                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-select-currency"
                                value={userInfo.title || ''}
                                select
                                label="Select Title"
                                fullWidth
                                onChange={(event) =>
                                    handleInput('title', event.target.value)
                                }
                                variant="outlined"
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
                        <Grid item xs={12}>
                            <TextField
                                id="firstName"
                                label="First Name"
                                fullWidth
                                value={userInfo.firstName || ''}
                                onChange={(event) =>
                                    handleInput('firstName', event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="lastName"
                                name="lastName"
                                label="Last Name"
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
                                id="email"
                                name="email"
                                label="Email Address"
                                fullWidth
                                autoComplete="Email Address"
                                value={userInfo.email || ''}
                                onChange={(event) =>
                                    handleInput('email', event.target.value)
                                }
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}
