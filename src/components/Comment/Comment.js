import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// import Avatar from '@atlaskit/avatar';

import Comment, {
    CommentAction,
    CommentAuthor,
    CommentEdited,
    CommentTime,
} from '@atlaskit/comment';
import {Avatar} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    }),
);


export default (props) => {
    const classes = useStyles();

    return (
        <div>
            <Comment
                avatar={<Avatar src={props.avatar}/>}
                author={<CommentAuthor>{props.author}</CommentAuthor>}
                type={props.isAuthor ? "author" : null}
                edited={<CommentEdited>{props.edited}</CommentEdited>}
                // restrictedTo="Restricted to Admins Only"
                time={<CommentTime>{props.date}</CommentTime>}
                content={
                    <p>
                        {props.content}
                    </p>
                }
                actions={[
                    <CommentAction>Reply</CommentAction>,
                    <CommentAction>Edit</CommentAction>,
                    <CommentAction>Like</CommentAction>,
                ]}
            />
        </div>
    );
}