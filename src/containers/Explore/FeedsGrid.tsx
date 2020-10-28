import {Grid} from '@material-ui/core';
import React from 'react';
import FeedItem from '../../components/Feed/FeedItem';

export default ({activities, fetchFeed}: any) => {
    return (
        <div>
            {activities.map((activity: any) => {
                return (
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={6}
                    >
                        <Grid item xs={12}>
                            <FeedItem activity={activity} />
                        </Grid>
                    </Grid>
                );
            })}
        </div>
    );
};
