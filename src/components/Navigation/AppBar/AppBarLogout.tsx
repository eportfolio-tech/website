import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Link,
    withWidth,
} from '@material-ui/core';
import {makeStyles, Theme} from '@material-ui/core/styles';

import {
    SignInDialog as SignIn,
    SignUpDialog as SignUp,
} from '../../AuthDialogs';
import logoImage from '../../../assets/logo.svg';

const useStyles = makeStyles((theme: Theme) => ({
    logo: {
        maxHeight: '3rem',
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,

        marginLeft: theme.spacing(10),
    },
    getStarted: {
        margin: theme.spacing(1, 20, 1, 1),
        minWidth: '10rem',
        borderRadius: 10,
        textTransform: 'none',
        fontWeight: 550,
        fontFamily: 'Arial',
        color: 'white',
    },
    signIn: {
        textTransform: 'none',
        minWidth: '10rem',
        fontWeight: 550,
        borderRadius: 10,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: 'rgba(255,255,255,0.9)',
        boxShadow: 'none',
        minHeight: 50,
    },
}));

/***
 * The App Bar at the top.
 */
export default withWidth()(() => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();

    //const [avatarEL, setAvatarEL] = useState(null);
    const [openLogin, setOpenLogin] = useState(location.pathname === '/login');
    const [openSignUp, setOpenSignUp] = useState(
        location.pathname === '/sign-up'
    );

    useEffect(() => {
        if (location.pathname === '/login') {
            setOpenLogin(true);
        } else if (location.pathname === '/sign-up') {
            setOpenSignUp(true);
        }
    }, [location.pathname]);

    return (
        <div>
            <SignIn open={openLogin} setOpen={setOpenLogin} />
            <SignUp open={openSignUp} setOpen={setOpenSignUp} />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Link
                        underline="none"
                        color="textPrimary"
                        href="/"
                        className={classes.toolbarTitle}
                    >
                        <Button
                            style={{
                                textTransform: 'none',
                            }}
                        >
                            <img
                                className={classes.logo}
                                src={logoImage}
                                alt="logo"
                            />
                            <Typography variant="h6" style={{fontWeight: 800}}>
                                Forty-Two
                            </Typography>
                        </Button>
                    </Link>
                    <Button
                        size={'large'}
                        className={classes.signIn}
                        onClick={() => {
                            history.push('/login');
                            setOpenLogin(true);
                        }}
                    >
                        Sign In
                    </Button>
                    <Button
                        size={'large'}
                        className={classes.getStarted}
                        color="primary"
                        disabled={location.pathname === '/sign-up'}
                        onClick={() => {
                            history.push('/sign-up');
                            setOpenSignUp(true);
                        }}
                        variant="contained"
                    >
                        Join Us
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
});
