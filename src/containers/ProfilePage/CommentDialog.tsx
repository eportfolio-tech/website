import React, {useState} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
// @material-ui/icons
// core components

import {
    Grid,
    Drawer,
    IconButton,
    TextField,
    Typography,
    Container,
} from '@material-ui/core';
import {Close, Send} from '@material-ui/icons';

import {useDispatch} from 'react-redux';
import Comments from './Comments';
import {socialService} from '../../utils/socialService';
import {useHistory} from 'react-router-dom';
import {alertActions} from '../../store/actions';

// @ts-ignore
const useStyles: any = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // backgroundColor: theme.palette.background.paper,
        },
        closeComments: {
            marginTop: theme.spacing(1),
        },
        header: {
            marginTop: theme.spacing(2),
        },
        newComment: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        submitComment: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
    })
);

export default ({
    openComment,
    setOpenComment,
    authorName,
    comments,
    loggedIn,
    username,
    fetchComment,
}: any) => {
    const classes = useStyles();
    const historyDom = useHistory();
    const dispatch = useDispatch();

    // const authorName = match.params.username;
    const [newComment, setNewComment] = useState('');

    const handleNewComment = async () => {
        if (newComment === '') {
            dispatch(alertActions.warning("Don't leave your comment empty."));
            return;
        }
        if (loggedIn) {
            try {
                await socialService.createComment(username, newComment);
                fetchComment();
                setNewComment('');
            } catch (error) {
                dispatch(alertActions.error(error));
            }
        } else {
            historyDom.push('/?login=true');
        }
    };

    return (
        <Drawer
            anchor="right"
            open={openComment}
            onClose={() => {
                setOpenComment(false);
            }}
        >
            <Grid container style={{width: '35VW'}}>
                <Grid item xs={1}></Grid>
                <Grid item xs={9} className={classes.header}>
                    <Typography variant="h6">{`  Responses(${
                        comments ? comments.length : '0'
                    })`}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <IconButton
                        onClick={() => {
                            setOpenComment(false);
                        }}
                        className={classes.closeComments}
                    >
                        <Close />
                    </IconButton>
                </Grid>

                <Grid item xs={10} className={classes.newComment}>
                    <Container>
                        <TextField
                            label="Leave your comment here"
                            variant="outlined"
                            fullWidth
                            value={newComment}
                            onChange={(event) =>
                                setNewComment(event.target.value)
                            }
                        ></TextField>
                    </Container>
                </Grid>
                <Grid item xs={2}>
                    <IconButton
                        onClick={handleNewComment}
                        className={classes.submitComment}
                        color="secondary"
                    >
                        <Send />
                    </IconButton>
                </Grid>

                <Comments authorName={authorName} comments={comments} />
            </Grid>
        </Drawer>
    );
};
