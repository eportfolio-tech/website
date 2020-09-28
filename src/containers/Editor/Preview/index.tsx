import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import MyHTML from '../MyHtml';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',

            background: theme.palette.secondary.main,
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        content: {
            flexGrow: 1,
            [theme.breakpoints.up('lg')]: {
                padding: theme.spacing(13),
            },
            [theme.breakpoints.down('sm')]: {
                //padding: theme.spacing(4),
                marginTop: '18%',
                padding: theme.spacing(10),
            },
            [theme.breakpoints.between('sm', 'md')]: {
                //padding: theme.spacing(4),
                marginTop: '8%',
            },
            width: '100VW',
            maxWidth: '100VW',
            background: theme.palette.background.default,
        },
        root: {
            display: 'flex',
        },
        profile: {
            textAlign: 'center',
            '& img': {
                maxWidth: '160px',
                width: '100%',
            },
            marginTop: theme.spacing(10),
        },
        description: {
            margin: '1.071rem auto 0',
            maxWidth: '600px',
            color: '#999',
            textAlign: 'center',
        },
        name: {},
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
}: any) {
    const classes = useStyles();
    const userInfo = JSON.parse(localStorage.getItem('user') || '').user;

    const handleClose = () => {
        setOpen(false);
    };
    // console.log(userInfo);

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
                <div className={classes.profile}>
                    <div>
                        <img src={userInfo.avatarUrl} alt="..." />
                    </div>
                    <div className={classes.name}>
                        <h1
                            className={classes.title}
                        >{`${userInfo.firstName} ${userInfo.lastName}`}</h1>
                        <h2>{title}</h2>
                    </div>
                </div>
                <div className={classes.description}>
                    <p>{description}</p>
                </div>
                <br />
                <br />
                <MyHTML html={html} />
            </div>
        </Dialog>
    );
}
