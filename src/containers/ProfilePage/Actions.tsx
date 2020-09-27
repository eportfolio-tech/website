import React from 'react';
// nodejs library that concatenates classes
// @material-ui/core components
import {createStyles, makeStyles} from '@material-ui/core/styles';
// @material-ui/icons
// core components

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {alertActions} from '../../store/actions/alertActions';
import {useDispatch} from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
// @ts-ignore
import {CopyToClipboard} from 'react-copy-to-clipboard';
import LikeBar from '../ProfilePage/LikeBar';
import {
    Badge,
    Button,
    CssBaseline,
    Drawer,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from '@material-ui/core';
import clsx from 'clsx';

// @ts-ignore
const useStyles: any = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: theme.spacing(25) + 1,
            position: 'fixed',
            backgroundColor: 'rgba(250,250,250,0)',
            zIndex: 1,
            top: '30VH',
            right: 0,
            whiteSpace: 'nowrap',
            border: 'none',
        },
    })
);

interface IAction {
    history: any;
    handleLike?: any;
    handleComment?: any;
    handleShare?: any;
    liked?: boolean;
    commented?: number;
}

export default function ProfilePage({
    history,
    handleLike,
    handleComment,
    handleShare,
    liked,
    commented,
}: IAction) {
    const classes = useStyles();
    // @ts-ignore
    const open = true;
    const url = window.location.href;
    const dispatch = useDispatch();
    return (
        <div>
            <CssBaseline />
            <Grid container>
                <Grid item xs={2}>
                    <Grid container justify="center">
                        <Button
                            onClick={() => {
                                history.goBack();
                            }}
                            startIcon={<ArrowBackIosIcon />}
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Drawer
                classes={{
                    paper: clsx({
                        [classes.root]: open,
                    }),
                }}
                variant="permanent"
                anchor="right"
            >
                <Grid container justify="flex-end">
                    {/* <Grid item xs={12}>
                        <Tooltip
                            arrow
                            title={
                                <Typography variant="body1">
                                    {'Go Back'}
                                </Typography>
                            }
                            placement="left"
                            interactive
                        >
                            <IconButton
                                aria-label="back"
                                onClick={() => {
                                    history.goBack();
                                }}
                            >
                                <ArrowBackIosIcon />
                            </IconButton>
                        </Tooltip>
                        <br />
                        <br />
                    </Grid> */}
                    <Grid item xs={12}>
                        <Tooltip
                            arrow
                            title={
                                <Typography variant="body1">
                                    {'Like'}
                                </Typography>
                            }
                            placement="left"
                            interactive
                        >
                            <IconButton
                                aria-label="like"
                                color={liked ? 'secondary' : undefined}
                                onClick={handleLike}
                            >
                                <FavoriteIcon />
                            </IconButton>
                        </Tooltip>
                        <br />
                        <br />
                    </Grid>
                    <Grid item xs={12}>
                        <Tooltip
                            arrow
                            title={
                                <Typography variant="body1">
                                    {'Share'}
                                </Typography>
                            }
                            placement="left"
                            interactive
                        >
                            <CopyToClipboard
                                text={url}
                                onCopy={() => {
                                    dispatch(
                                        alertActions.success(
                                            'URL have copied to your clipboard.'
                                        )
                                    );
                                }}
                            >
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </CopyToClipboard>
                        </Tooltip>
                        <br />
                        <br />
                    </Grid>
                    <Grid item xs={12}>
                        <Tooltip
                            arrow
                            title={
                                <Typography variant="body1">
                                    {'Comment'}
                                </Typography>
                            }
                            placement="left"
                            interactive
                        >
                            <IconButton
                                onClick={handleComment}
                                color={commented ? 'secondary' : undefined}
                            >
                                <Badge
                                    badgeContent={commented}
                                    color="secondary"
                                >
                                    <CommentOutlinedIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <br />
                        <br />
                    </Grid>
                </Grid>
            </Drawer>
        </div>
    );
}
