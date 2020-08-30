import React from 'react';
import {
    Grid,
    Dialog,
    IconButton,
    DialogTitle,
    Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import SignUpForm from './signUpForm';
//import { AuthApi } from "./../Methods";
import {Close} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },

    cancel: {
        marginTop: theme.spacing(1),
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

interface ISignUp {
    open: boolean;
    setOpen: any;
}

/***
 * Login dialog
 */
export default ({open, setOpen}: ISignUp) => {
    const classes = useStyles();
    //const { setLoginEl, openLogin, setOpenLogin } = useContext(AuthApi);

    //const [open, setOpen] = useState(false);

    const closeSignUpWindow = () => {
        setOpen(false);
        //setLoginEl(null);
    };

    return (
        <Dialog
            onClose={closeSignUpWindow}
            aria-labelledby="customized-dialog-title"
            open={open}
            className={classes.root}>
            <DialogTitle>
                <Grid container justify="space-between">
                    <Grid item xs={3}>
                        <Typography
                            className={classes.title}
                            component="h1"
                            variant="h4"
                            align="center">
                            Sign Up
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justify="flex-end">
                            <IconButton
                                className={classes.cancel}
                                onClick={closeSignUpWindow}>
                                <Close />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogTitle>

            <SignUpForm />
        </Dialog>
    );
};
