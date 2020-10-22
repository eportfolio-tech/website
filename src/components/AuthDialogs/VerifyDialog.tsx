import React from 'react';
import {useLocation, useHistory} from 'react-router-dom';

import {
    Grid,
    Dialog,
    DialogTitle,
    Button,
    Paper,
    Container,
    Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {useDispatch} from 'react-redux';
import {authService} from '../../utils/authService';
import {alertActions} from '../../store/actions/alertActions';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        width: theme.spacing(55),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '90VH',
    },
    submit: {
        margin: theme.spacing(2, 0, 0),
        background: 'linear-gradient(-60deg, #63ce29 0%, #008bd1 100%);',
        borderRadius: 10,
        textTransform: 'none',
        fontWeight: 550,
        fontFamily: 'Arial',
    },
}));

interface IVerify {
    open: boolean;
    setOpen: any;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

/***
 * Login dialog
 */
export default ({open, setOpen}: IVerify) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();

    //const { setLoginEl, openLogin, setOpenLogin } = useContext(AuthApi);
    //const [open, setOpen] = useState(false);

    const onVerifyHandler = async () => {
        try {
            await authService.verifyEmail(
                query.get('token'),
                query.get('username')
            );

            history.push('/?login=true');
            setOpen(false);
            dispatch(
                alertActions.success(
                    'Your email have been successfully verified.'
                )
            );
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    return (
        <Dialog
            aria-labelledby="customized-dialog-title"
            open={open}
            className={classes.root}
        >
            <DialogTitle>
                <Typography variant="h5" align="center">
                    Welcome, {query.get('username')}.
                </Typography>
            </DialogTitle>

            <Grid container justify="center">
                <Paper elevation={0} className={classes.paper}>
                    <Container>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
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
        </Dialog>
    );
};
