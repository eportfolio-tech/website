import ResetPassword from './ResetPassword';
import UserTags from './UserTag';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '100%',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
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
            </Grid>
        </div>
    );
};
