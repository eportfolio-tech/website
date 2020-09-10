import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
    TextField,
    Grid,
    CardContent,
    Card,
    CardHeader,
    Typography,
} from '@material-ui/core';
import { userService } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { alertActions } from '../../store/actions/alertActions';

import KeyIcon from '@material-ui/icons/VpnKey';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(0),
            },
        },
        resetButton: {
            marginTop: theme.spacing(3),
            height: '100%',
            marginRight: theme.spacing(2),
            textTransform: 'none',
        },
        cardTitle: {
            marginTop: theme.spacing(3),
        },
        cardTitleIcon: {
            marginTop: theme.spacing(3),
            color: '#f59002',
        },
    })
);

export default function ResetPassword() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const checkPassword = () => {
        if (newPassword.length === 0) {
            // to not dispplay error when empty
            return true;
        }
        if (newPassword.length < 8) {
            return false;
        }
        if (/\s/.test(newPassword)) {
            return false;
        }
        return (
            /[a-z]/.test(newPassword) &&
            /[A-Z]/.test(newPassword) &&
            /\d/.test(newPassword)
        );
    };

    const onResetHandler = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('user') || '');
            const username = userInfo.username;

            await userService.resetPassword(username, oldPassword, newPassword);
            dispatch(alertActions.success('reset password succeed'));
        } catch (error) {
            dispatch(
                alertActions.error(
                    'reset password failed: ' + error.response.data.errors
                )
            );
        }
    };

    return (
        <div className={classes.root}>
            <Card style={{ height: '100%' }}>
                <CardHeader
                    avatar={<KeyIcon className={classes.cardTitleIcon} />}
                    title={
                        <Typography variant='h6' className={classes.cardTitle}>
                            Reset Your Password
                        </Typography>
                    }
                    action={
                        <Button
                            variant='contained'
                            color='secondary'
                            disabled={
                                !oldPassword || !newPassword || !repeatPassword
                            }
                            onClick={onResetHandler}
                            className={classes.resetButton}
                        >
                            <PublishIcon />
                            Reset
                        </Button>
                    }
                />

                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id='outlined-basic'
                                label='Old Password'
                                variant='outlined'
                                type='password'
                                onChange={(event) =>
                                    setOldPassword(event.target.value)
                                }
                                fullWidth
                            >
                                Old Password
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id='outlined-basic'
                                label='New Password'
                                variant='outlined'
                                type='password'
                                onChange={(event) =>
                                    setNewPassword(event.target.value)
                                }
                                error={!checkPassword()}
                                fullWidth
                            >
                                New Password
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id='outlined-basic'
                                label='Re-enter New Password'
                                variant='outlined'
                                type='password'
                                onChange={(event) =>
                                    setRepeatPassword(event.target.value)
                                }
                                error={
                                    newPassword !== repeatPassword &&
                                    repeatPassword.length > 0
                                }
                                fullWidth
                            >
                                Repeat New Password
                            </TextField>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}
