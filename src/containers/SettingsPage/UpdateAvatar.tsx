import React, {useEffect, useState, useRef} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Fab,
    Grid,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Edit';
import FaceIcon from '@material-ui/icons/Face';
import PublishIcon from '@material-ui/icons/Publish';

import {useDispatch, useSelector} from 'react-redux';
import {IRootState} from '../../index';
import {alertActions} from '../../store/actions/alertActions';
import {userActions} from '../../store/actions/userActions';

import {userService} from '../../utils/userService';
import {authService} from '../../utils/authService';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        large: {
            width: theme.spacing(20),
            height: theme.spacing(20),
            margin: 'auto',
        },

        saveButton: {
            marginTop: theme.spacing(3),
            height: '100%',
            marginRight: theme.spacing(2),
            textTransform: 'none',
        },
        cardTitleIcon: {
            marginTop: theme.spacing(3),
            color: '#f59002',
        },
    })
);

export default function UpdateAvatar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const auth = useSelector<IRootState>((state) => state.auth);
    const user = (auth as any).user;

    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string>(user.avatarUrl);
    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        onUpload();
    }, [avatar]);

    const onFileChange = async (event: any) => {
        setAvatar(event.target.files[0]);
    };

    const onUpload = async () => {
        try {
            const res = await userService.uploadFile(user.username, avatar);
            setAvatarUrl(res.URI);
        } catch (error) {
            dispatch(
                alertActions.error(
                    'set avatar failed: ' +
                        Object.values(error.response.data.data)
                )
            );
        }
    };

    const onSaveHandler = async () => {
        user.avatarUrl = avatarUrl;
        try {
            await authService.updateInfo(user.username, user);
            (auth as any).user = user;
            dispatch(userActions.update(auth));
            dispatch(alertActions.success('set avatar succeed'));
        } catch (error) {
            dispatch(
                alertActions.error(
                    'set avatar failed: ' +
                        Object.values(error.response.data.data)
                )
            );
            // console.log('error', error);
        }
    };

    return (
        <Card style={{width: '100%', height: '100%'}}>
            <CardHeader
                avatar={<FaceIcon />}
                title={
                    <Typography variant="h6">
                        Change your profile image
                    </Typography>
                }
                action={
                    <Button
                        className={classes.saveButton}
                        color="secondary"
                        variant="contained"
                        component="span"
                        onClick={onSaveHandler}
                    >
                        <PublishIcon />
                        Update
                    </Button>
                }
            />
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Avatar
                            alt={user.username.toUpperCase()}
                            src={avatarUrl}
                            className={classes.large}
                        ></Avatar>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container alignItems="center">
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
                                    onChange={onFileChange}
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
                </Grid>
            </CardContent>
        </Card>
    );
}
