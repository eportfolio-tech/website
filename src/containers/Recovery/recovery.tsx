import React, { useState } from 'react';
import {
    Grid,
    Button,
    Paper,
    Container,
    Typography,
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import { userService } from '../../services/userService';

import { useDispatch } from 'react-redux';
import { alertActions } from '../../store/actions/alertActions';
import Layout from '../../components/Navigation/layout';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    close: {
        marginTop: theme.spacing(1),
    },
    cancel: {
        marginTop: theme.spacing(1.4, 1),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        background: theme.palette.background.default,
    },
    submit: {
        textTransform: 'none',
        fontWeight: 550,
        fontFamily: 'Arial',
    },
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

/***
 * Login dialog
 */
export default () => {
    const classes = useStyles();
    const query = useQuery();
    const dispatch = useDispatch();
    const history = useHistory();

    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    //const { setLoginEl, openLogin, setOpenLogin } = useContext(AuthApi);

    //const [open, setOpen] = useState(false);

    const onRecoveryHandler = async () => {
        try {
            await userService.recoveryPassword(
                query.get('token'),
                query.get('username'),
                password
            );

            history.push('/login');
            dispatch(
                alertActions.success(
                    'Your email have been successfully verified.'
                )
            );
        } catch (error) {
            dispatch(alertActions.error(error.response.data.errors));
        }
    };

    return (
        <Layout>
            <div className={classes.root}>
                <Typography variant='h4' align='center'>
                    <LockOpenIcon style={{ height: '30%', width: '30%' }} />
                    <br />
                    Welcome back, {query.get('username')}.
                </Typography>

                <Grid container justify='center'>
                    <Paper elevation={0} className={classes.paper}>
                        <Container>
                            <br />
                            <br />
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        required
                                        id='outlined-basic'
                                        label='New Password'
                                        variant='outlined'
                                        type='password'
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        fullWidth
                                    >
                                        New Password
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        required
                                        id='outlined-basic'
                                        label='Repeat Password'
                                        variant='outlined'
                                        type='password'
                                        onChange={(event) =>
                                            setRepeatPassword(
                                                event.target.value
                                            )
                                        }
                                        error={
                                            password !== repeatPassword &&
                                            repeatPassword.length > 0
                                        }
                                        fullWidth
                                    >
                                        Repeat Password
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant='contained'
                                        color='secondary'
                                        className={classes.submit}
                                        size='large'
                                        onClick={onRecoveryHandler}
                                    >
                                        Click to reset your password.
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                        <br />
                        <br />
                    </Paper>
                </Grid>
            </div>
        </Layout>
    );
};
