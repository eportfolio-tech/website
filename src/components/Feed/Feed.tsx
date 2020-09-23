import React from 'react';
import StyledFeedItem from './FeedItem';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import {Grid} from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        feed: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    })
);

const urls = [
    'https://source.unsplash.com/collection/190727',
    'https://source.unsplash.com/collection/190726',
    'https://source.unsplash.com/collection/190725',
    'https://source.unsplash.com/collection/200727',
    'https://source.unsplash.com/collection/190723',
    'https://source.unsplash.com/collection/200726',
    'https://source.unsplash.com/collection/210725',
    'https://source.unsplash.com/collection/210726',
];

function Feed() {
    const classes = useStyles();

    return (
        <div className={classes.feed}>
            <Grid container spacing={2}>
                {urls.map((image) => (
                    <Grid item xs={6}>
                        <ListItem>
                            <StyledFeedItem image={image} />
                        </ListItem>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Feed;
