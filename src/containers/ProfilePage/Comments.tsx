import {Grid} from '@material-ui/core';
import React from 'react';

import Comment from '../../components/Comment/Comment';

const compareDate = (d1: any, d2: any) => {
    return new Date(d1).getTime() === new Date(d2).getTime();
};

export default ({authorName, comments}: any) => {
    let commentComponents = null;
    const userInfo = JSON.parse(localStorage.getItem('user') || 'null');
    let username = '';
    if (userInfo) username = userInfo.user.username;

    if (comments != null && comments.length > 0) {
        const parents = comments.filter((each: any) => !each.parentId);
        if (!parents) return null;

        commentComponents = parents.map((c: any) => (
            <Grid item xs={12} style={{padding: '5%'}}>
                <Comment
                    author={c.username}
                    content={c.content}
                    date={new Date(c.createdDate).toDateString()}
                    avatar={c.avatar}
                    isAuthor={username === c.username}
                    edited={!compareDate(c.createdDate, c.updatedDate)}
                    editable={c.username === username}
                >
                    {comments
                        .filter((each: any) => each.parentId === c.id)
                        .map((subC: any) => {
                            if (!subC) return null;

                            return (
                                <Comment
                                    author={subC.username}
                                    content={subC.content}
                                    date={new Date(
                                        subC.createdDate
                                    ).toDateString()}
                                    avatar={subC.avatar}
                                    isAuthor={username === authorName}
                                    edited={
                                        !compareDate(
                                            subC.createdDate,
                                            subC.updatedDate
                                        )
                                    }
                                    editable={subC.username === username}
                                />
                            );
                        })}
                </Comment>
            </Grid>
        ));
    }

    return commentComponents;
};
