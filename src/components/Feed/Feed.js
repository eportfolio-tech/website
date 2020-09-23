import React, {Component} from 'react'
import StyledFeedItem from "./FeedItem"
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {Typography} from "@material-ui/core";

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
            <StyledFeedItem onClick={() => placeHolder}/>
            <StyledFeedItem onClick={() => placeHolder}/>
            <StyledFeedItem onClick={() => placeHolder}/>
        </div>
    )
}

export default Feed