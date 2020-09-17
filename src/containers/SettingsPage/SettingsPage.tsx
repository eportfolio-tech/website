import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';

import ResetPassword from './ResetPassword';
import UserTags from './UserTag';
import UpdateInfo from './UpdateInfo';

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
                <Grid item md={6} xs={12}>
                    <ResetPassword />
                </Grid>
                <Grid item md={6} xs={12}>
                    <UserTags />
                </Grid>
                <Grid item md={6} xs={12}>
                    <UpdateInfo />
                </Grid>
            </Grid>
        </div>
    );
};
