import React from 'react';
import {Grid, Button, Paper, Container, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useLocation, useHistory} from 'react-router-dom';
import {authService} from '../../utils/authService';

import {useDispatch} from 'react-redux';
import {alertActions} from '../../store/actions/alertActions';
import Layout from '../../components/Navigation';

import EmailIcon from '@material-ui/icons/Drafts';

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

    //const { setLoginEl, openLogin, setOpenLogin } = useContext(AuthApi);

    //const [open, setOpen] = useState(false);

    const onVerifyHandler = async () => {
        try {
            await authService.verifyEmail(
                query.get('token'),
                query.get('username')
            );

            history.push('/login');
            dispatch(
                alertActions.success(
                    'Your email have been successfully verified.'
                )
            );
        } catch (error) {
            dispatch(
                alertActions.error(Object.values(error.response.data.data))
            );
        }
    };

    return (
        <Layout>
            <div className={classes.root}>
                <Typography variant="h4" align="center">
                    <EmailIcon style={{height: '30%', width: '30%'}} />
                    <br />
                    Welcome, {query.get('username')}.
                </Typography>

                <Grid container justify="center">
                    <Paper elevation={0} className={classes.paper}>
                        <Container>
                            <br />
                            <br />
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                size="large"
                                onClick={onVerifyHandler}
                            >
                                Click to verify your email.
                            </Button>
                        </Container>
                        <br />
                        <br />
                    </Paper>
                </Grid>
            </div>
        </Layout>
    );
};
