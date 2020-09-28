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

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

/***
 * The App Bar at the top.
 */
export default withWidth()(() => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const query = useQuery();

    //const [avatarEL, setAvatarEL] = useState(null);
    const [openLogin, setOpenLogin] = useState(query.get('login'));
    const [openSignUp, setOpenSignUp] = useState(query.get('sign-up'));

    useEffect(() => {
        if (query.get('login')) {
            setOpenLogin('true');
        } else if (query.get('sign-up')) {
            setOpenSignUp('true');
        }
    }, [location.pathname, query]);

    return (
        <div>
            <SignIn open={openLogin === 'true'} setOpen={setOpenLogin} />
            <SignUp open={openSignUp === 'true'} setOpen={setOpenSignUp} />
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
                            history.push('/?login=true');
                            setOpenLogin('true');
                        }}
                    >
                        Sign In
                    </Button>
                    <Button
                        size={'large'}
                        className={classes.getStarted}
                        color="primary"
                        onClick={() => {
                            history.push('/?sign-up=true');
                            setOpenSignUp('true');
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
