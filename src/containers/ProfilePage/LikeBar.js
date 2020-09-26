import React, {Component, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SaveIcon from '@material-ui/icons/Save';
import ReportIcon from '@material-ui/icons/Report';
import {withStyles} from '@material-ui/core/styles';
import {
    Button,
    Container,
    IconButton,
    Paper,
    TextField,
} from '@material-ui/core';
import {connect, useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
// import axios from "../../helper/axios";
import {useHistory, withRouter} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
// import FeedbackForm from "../FeedbackForm/FeedbackForm";
// import {subjectActions} from "../../store/actions/subjectActions";
import {alertActions} from '../../store/actions/alertActions';
import {withSnackbar} from 'notistack';
import {authService} from '../../utils/authService';
import Layout from '../../components/Navigation';
import LockOpenIcon from '@material-ui/icons/Lock';
// import {userService} from "../../services/UserService";

const styles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    media: {
        height: 140,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});

export default () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState('');

    const onLikeHandler = async () => {
        try {
            await authService.getRecoveryLink(email);
            history.push('/login');
            dispatch(alertActions.success('Email sent.'));
        } catch (error) {
            dispatch(alertActions.error(error.response.data.errors));
        }
    };

    return (
        <Layout>
            <div className={classes.root}>
                <Typography variant="h5" align="center">
                    <LockOpenIcon
                        style={{
                            height: '25%',
                            width: '25%',
                        }}
                    />
                    <br />
                    Enter your email to recover your password.
                </Typography>

                <Grid container justify="center">
                    <Paper elevation={0} className={classes.paper}>
                        <Container>
                            <br />
                            <br />
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-basic"
                                        label="Email"
                                        variant="outlined"
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
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                        size="large"
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
