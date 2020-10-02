import React from 'react';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import ResetPassword from './ResetPassword';
import UserTags from './UserTag';
import UpdateInfo from './UpdateInfo';
import UpdateAvatar from './UpdateAvatar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '100%',
        },
    })
);

export default () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <UpdateInfo />
                </Grid>
                <Grid item xs={12} md={6}>
                    <UpdateAvatar />
                </Grid>
                <Grid item xs={12}>
                    <UserTags />
                </Grid>
                <Grid item xs={12}>
                    <ResetPassword />
                </Grid>
            </Grid>
        </div>
    );
};
