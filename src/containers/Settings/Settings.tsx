import ResetPassword from './ResetPassword';
import UserTags from './userTags';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '100%',
            maxWidth: 500,
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
                <Grid item xs={12} sm={6}>
                    <Typography variant='h6' gutterBottom>
                        Reset Password
                    </Typography>
                    <ResetPassword />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant='h6' gutterBottom>
                        Modify your tags
                    </Typography>
                    <UserTags />
                </Grid>
            </Grid>
        </div>
    );
};
