import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {Avatar, Button} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        large: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
    })
);

export default function UpdateAvatar() {
    const classes = useStyles();
    // const dispatch = useDispatch();
    const user = useSelector<any>((state) => state.auth.user);

    return (
        <div className={classes.root}>
            <div>
                <Avatar
                    alt="Remy Sharp"
                    src={(user as any).avatarUrl}
                    className={classes.large}
                />
            </div>
            <div>
                <Button variant="contained" color="secondary">
                    Upload
                    <input type="file" accept=".png" />
                </Button>
            </div>
        </div>
    );
}
