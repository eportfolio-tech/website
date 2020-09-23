import React, {Component} from 'react'
import StyledFeedItem from "./FeedItem"
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

const useStyles = makeStyles(() =>
    createStyles({
        feed: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
    })
);

function placeHolder() {
    return;
}

function Feed() {
    const classes = useStyles();

    return (
        <div className={classes.feed}>
            <Paper>
                <List>
                    <ListItem>
                        <StyledFeedItem onClick={() => placeHolder}/>
                    </ListItem>
                    <ListItem>
                        <StyledFeedItem onClick={() => placeHolder}/>
                    </ListItem>
                    <ListItem>
                        <StyledFeedItem onClick={() => placeHolder}/>
                    </ListItem>
                </List>

            </Paper>
        </div>
    )
}

export default Feed