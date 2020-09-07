import React from 'react';
import {
    Grid,
    Dialog,
    DialogTitle,
    Button,
    Paper,
    Container,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import { userService } from '../../services/userService';

import { useDispatch } from 'react-redux';
import { alertActions } from '../../store/actions/alertActions';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        width: theme.spacing(55),
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
export default ({ open, setOpen }: IVerify) => {
    const classes = useStyles();
    const query = useQuery();
    const dispatch = useDispatch();
    const history = useHistory();

    //const { setLoginEl, openLogin, setOpenLogin } = useContext(AuthApi);

    //const [open, setOpen] = useState(false);

    const onVerifyHandler = async () => {
        try {
            await userService.verifyEmail(
                query.get('token'),
                query.get('username')
            );

            history.push('/login');
            setOpen(false);
            dispatch(alertActions.success('successfully verified.'));
        } catch (error) {
            dispatch(alertActions.error(error.response.data.errors));
        }
    };

    return (
        <Dialog
            aria-labelledby='customized-dialog-title'
            open={open}
            className={classes.root}
        >
            <DialogTitle>
                <Typography variant='h5' align='center'>
                    Welcome, {query.get('username')}.
                </Typography>
            </DialogTitle>

            <Grid container justify='center'>
                <Paper elevation={0} className={classes.paper}>
                    <Container>
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            size='large'
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
