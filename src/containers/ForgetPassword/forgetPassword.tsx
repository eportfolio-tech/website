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
import { useHistory } from 'react-router-dom';
import { userService } from '../../services/userService';

import { useDispatch } from 'react-redux';
import { alertActions } from '../../store/actions/alertActions';
import Layout from '../../components/Navigation/layout';
import LockOpenIcon from '@material-ui/icons/Lock';

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

/***
 * Login dialog
 */
export default () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState('');

    //const { setLoginEl, openLogin, setOpenLogin } = useContext(AuthApi);

    //const [open, setOpen] = useState(false);

    const onRecoveryHandler = async () => {
        try {
            await userService.getRecoveryLink(email);
            history.push('/login');
            dispatch(alertActions.success('Email already sent.'));
        } catch (error) {
            dispatch(alertActions.error(error.response.data.errors));
        }
    };

    return (
        <Layout>
            <div className={classes.root}>
                <Typography variant='h5' align='center'>
                    <LockOpenIcon
                        style={{
                            height: '25%',
                            width: '25%',
                        }}
                    />
                    <br />
                    Enter your email to recover your password.
                </Typography>

                <Grid container justify='center'>
                    <Paper elevation={0} className={classes.paper}>
                        <Container>
                            <br />
                            <br />
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id='outlined-basic'
                                        label='Email'
                                        variant='outlined'
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        fullWidth
                                    >
                                        Please enter your email.
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <br />

                                    <Button
                                        fullWidth
                                        variant='contained'
                                        color='secondary'
                                        className={classes.submit}
                                        size='large'
                                        onClick={onRecoveryHandler}
                                    >
                                        Send recovery link.
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
