import React from 'react';
import {useHistory} from 'react-router-dom';

import {Grid, Dialog, IconButton, DialogTitle} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Close} from '@material-ui/icons';

import SignInForm from './SignInForm';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        maxWidth: theme.spacing(55),
    },
    cancel: {
        marginTop: theme.spacing(1.4, 1),
    },
}));

interface ISignIn {
    open: boolean;
    setOpen: any;
}

/***
 * Login dialog
 */
export default ({open, setOpen}: ISignIn) => {
    const classes = useStyles();
    const history = useHistory();

    //const { setLoginEl, openLogin, setOpenLogin } = useContext(AuthApi);
    //const [open, setOpen] = useState(false);

    const closeLoginWindow = () => {
        history.push('/');
        setOpen(false);
        //setLoginEl(null);
    };

    return (
        <Dialog
            onClose={closeLoginWindow}
            aria-labelledby="customized-dialog-title"
            open={open}
            className={classes.root}
        >
            <DialogTitle>
                <Grid container justify="flex-end">
                    <Grid item xs={2}>
                        <IconButton
                            className={classes.cancel}
                            onClick={closeLoginWindow}
                        >
                            <Close />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>

            <Grid container justify="center">
                <SignInForm close={closeLoginWindow} />
            </Grid>
        </Dialog>
    );
};
