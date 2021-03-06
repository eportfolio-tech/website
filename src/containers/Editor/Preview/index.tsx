import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import Profile from '../../../components/Profile';
import {Grid} from '@material-ui/core';
import Actions from '../../ProfilePage/Actions';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'fixed',
            background: theme.palette.secondary.main,
        },
        title: {
            marginLeft: theme.spacing(2),
        },
        content: {
            flexGrow: 1,
            [theme.breakpoints.up('lg')]: {
                padding: theme.spacing(15),
            },
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(8),
                marginTop: '4%',
            },
            [theme.breakpoints.between('sm', 'md')]: {
                padding: theme.spacing(8),
                marginTop: '4%',
            },
            width: '100%',
            minWidth: '100VW',
            background: theme.palette.background.default,
        },
        root: {
            //display: 'flex',
            background: theme.palette.background.default,
        },
    })
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {children?: React.ReactElement},
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
    open,
    setOpen,
    html,
    title,
    description,
    coverImage,
    music,
}: any) {
    const classes = useStyles();
    const userInfo = JSON.parse(localStorage.getItem('user') || 'null').user;
    const [liked, setLiked] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    // console.log(userInfo);

    const portfolio = {
        title: title,
        description: description,
        avatarUrl: userInfo.avatarUrl,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        username: userInfo.username,
        coverImage: coverImage,
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            className={classes.root}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        onClick={handleClose}
                        aria-label="close"
                        style={{color: 'white'}}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Preview
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.content}>
                <Actions
                    handleLike={() => {
                        setLiked(!liked);
                    }}
                    liked={liked}
                    handleComment={() => {}}
                    handleFollow={() => {}}
                    audioSrc={
                        music
                            ? music
                            : 'https://comp30002.blob.core.windows.net/image/cocabona,Glimlip-Drops.mp3'
                    }
                />
                <Grid container justify="center">
                    <Grid xs={12}>
                        <Profile
                            portfolio={portfolio}
                            content={html}
                            height={70}
                        />
                    </Grid>
                </Grid>
            </div>
        </Dialog>
    );
}
