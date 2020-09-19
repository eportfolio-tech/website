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
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FaceIcon from '@material-ui/icons/Face';

import {useDispatch, useSelector} from 'react-redux';
import {IRootState} from '../../index';
import {alertActions} from '../../store/actions/alertActions';
import {userActions} from '../../store/actions/userActions';

import {userService} from '../../utils/userService';
import {authService} from '../../utils/authService';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        large: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
        cardTitle: {
            marginTop: theme.spacing(3),
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
        <div className={classes.root}>
            <Card style={{height: '100%'}}>
                <CardHeader
                    avatar={<FaceIcon />}
                    title={
                        <Typography variant="h6" className={classes.cardTitle}>
                            Change your profile image
                        </Typography>
                    }
                />
                <CardContent>
                    <div>
                        <Avatar
                            alt={user.username.toUpperCase()}
                            src={avatarUrl}
                            className={classes.large}
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="upload-photo">
                            <input
                                style={{display: 'none'}}
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                accept=".png,.jpg"
                                onChange={onFileChange}
                            />
                            <Fab
                                color="primary"
                                size="small"
                                component="span"
                                aria-label="add"
                            >
                                <AddIcon />
                            </Fab>
                        </label>
                    </div>
                    <br />
                    <div>
                        <Button
                            color="secondary"
                            variant="contained"
                            component="span"
                            onClick={onSaveHandler}
                        >
                            Save
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
