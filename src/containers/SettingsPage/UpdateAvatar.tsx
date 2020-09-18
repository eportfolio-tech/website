import React, {useState} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {
    Avatar,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {useDispatch, useSelector} from 'react-redux';
import {IRootState} from '../../index';
import {userService} from '../../utils/userService';
import {alertActions} from '../../store/actions/alertActions';
import FaceIcon from '@material-ui/icons/Face';

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
    const user = useSelector<IRootState>((state) => state.auth.user);

    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string>((user as any).avatarUrl);

    const onFileChange = (event: any) => {
        setAvatar(event.target.files[0]);
        console.log(avatar);
    };

    const onUpload = async () => {
        try {
            const res = await userService.uploadFile(
                (user as any).username,
                avatar
            );
            setAvatarUrl(res.URI);
            dispatch(alertActions.success('upload avatar succeed'));
        } catch (error) {
            dispatch(
                alertActions.error(
                    'upload failed: ' + Object.values(error.response.data.data)
                )
            );
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
                            alt="Remy Sharp"
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
                            onClick={onUpload}
                        >
                            Save
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
