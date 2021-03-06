import React from 'react';
// nodejs library that concatenates classes
// @material-ui/core components
import {createStyles, makeStyles} from '@material-ui/core/styles';
// @material-ui/icons
// core components
import {alertActions} from '../../store/actions';
import {useDispatch} from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

// @ts-ignore
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {
    Badge,
    CssBaseline,
    IconButton,
    Tooltip,
    Typography,
} from '@material-ui/core';

import Music from '../../components/MusicPlayer';

// @ts-ignore
const useStyles: any = makeStyles(() =>
    createStyles({
        root: {
            position: 'fixed',
            backgroundColor: 'rgba(250,250,250,0)',
            top: '15VH',
            right: '5%',
        },
    })
);

interface IAction {
    history?: any;
    handleLike?: any;
    handleComment?: any;
    handleShare?: any;
    handleFollow?: any;
    liked?: boolean;
    likeNum?: number;
    commented?: number;
    follower?: boolean;
    comments?: any;
    audioSrc?: string;
}

export default function ProfilePage({
    handleLike,
    handleComment,
    handleFollow,
    liked,
    likeNum,
    commented,
    follower,
    comments,
    audioSrc,
}: IAction) {
    const classes = useStyles();
    // @ts-ignore
    const url = window.location.href;
    const dispatch = useDispatch();
    return (
        <div className={classes.root}>
            <CssBaseline />

            <Music src={audioSrc} />

            <br />

            <Tooltip
                arrow
                title={<Typography variant="body1">{'Like'}</Typography>}
                placement="left"
                interactive
            >
                <IconButton
                    aria-label="like"
                    color={liked ? 'secondary' : undefined}
                    onClick={handleLike}
                >
                    <Badge
                        badgeContent={likeNum}
                        color={liked ? 'secondary' : undefined}
                    >
                        <FavoriteIcon />
                    </Badge>
                </IconButton>
            </Tooltip>
            <br />
            <br />

            <Tooltip
                arrow
                title={<Typography variant="body1">{'Comment'}</Typography>}
                placement="left"
                interactive
            >
                <IconButton onClick={handleComment}>
                    <Badge
                        badgeContent={comments ? comments.length : 0}
                        color="secondary"
                    >
                        <CommentOutlinedIcon />
                    </Badge>
                </IconButton>
            </Tooltip>
            <br />
            <br />

            <Tooltip
                arrow
                title={<Typography variant="body1">{'Share'}</Typography>}
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

            <Tooltip
                arrow
                title={<Typography variant="body1">Follow</Typography>}
                placement="left"
                interactive
            >
                <IconButton
                    aria-label="follow"
                    color={follower ? 'secondary' : undefined}
                    onClick={handleFollow}
                >
                    {follower ? (
                        <PlaylistAddCheckIcon />
                    ) : (
                        <PlaylistAddOutlinedIcon />
                    )}
                </IconButton>
            </Tooltip>
            <br />
            <br />
        </div>
    );
}
