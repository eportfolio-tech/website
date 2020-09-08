import React, {
    useState,
    ReactChildren,
    ReactChild,
    useEffect,
    Fragment,
} from 'react';
import clsx from 'clsx';
import {
    makeStyles,
    useTheme,
    createStyles,
    Theme,
} from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import Drawer from '@material-ui/core/Drawer';
//import List from "@material-ui/core/List";
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';

import RemoveIcon from '@material-ui/icons/Remove';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { useSelector } from 'react-redux';
import { IRootState } from '../../index';

import AppBarLogin from './AppBar/appBarLogin';
import AppBarLogout from './AppBar/appBarLogout';
//import { UserContext, AuthApi } from "../Methods";
import { useHistory } from 'react-router-dom';
//import Cookies from "js-cookie";

import { useSnackbar } from 'notistack';

import { useDispatch } from 'react-redux';
import { alertActions } from '../../store/actions/alertActions';

import Loading from './loading';
import MenuList from './menuList';
import CancelIcon from '@material-ui/icons/Cancel';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),

            background: theme.palette.background.default,
            border: 'none',
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('md')]: {
                width: theme.spacing(9) + 1,
            },
            background: theme.palette.background.default,
            border: 'none',
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            backgroundColor: 'rgba(250,250,250,0.9)',
        },
        content: {
            flexGrow: 1,
            [theme.breakpoints.up('lg')]: {
                padding: theme.spacing(13),
            },
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(4),
                marginTop: '18%',
            },
            [theme.breakpoints.between('sm', 'md')]: {
                padding: theme.spacing(4),
                marginTop: '8%',
            },
            maxWidth: '100%',
        },
        noPaddingContent: {
            flexGrow: 1,
            maxWidth: '100%',
        },
        bottom: {
            position: 'fixed',
            bottom: 0,
            boxShadow: '20',
        },
    })
);

interface ILayoutProps {
    width: Breakpoint;
    type?: any;
    children?: ReactChild | ReactChildren;
    noPadding?: boolean;
}

/***
 * The layout of the application once login in.
 */
export default withWidth()(({ children, width, noPadding }: ILayoutProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const history = useHistory();
    const largeScreen = isWidthUp('lg', width);

    const loggedIn = useSelector<IRootState, boolean | undefined>(
        (state) => state.auth.loggedIn
    );

    const alert = useSelector<IRootState, any>((state) => state.alert);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const loadingRoute = false;
    const [open, setOpen] = useState(largeScreen);
    const handleRouting = (newRoute: String) => {
        history.push('/' + newRoute);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const getDrawlerOnClose = () => {
        if (largeScreen) return;
        setOpen(false);
    };

    // using alert bar.
    useEffect(() => {
        // customized closed button in snackbar
        const action = (key: any) => (
            <Fragment>
                <IconButton
                    onClick={() => {
                        closeSnackbar(key);
                    }}
                >
                    <CancelIcon />
                </IconButton>
            </Fragment>
        );

        if (alert.type) {
            enqueueSnackbar(alert.message, {
                variant: alert.type,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                action,
            });
            dispatch(alertActions.clear());
        }
    }, [alert, enqueueSnackbar, dispatch, closeSnackbar]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            {loggedIn ? (
                <AppBarLogin
                    openDrawer={largeScreen ? open : false}
                    handleDrawerOpen={handleDrawerOpen}
                    handleDrawerClose={handleDrawerClose}
                />
            ) : (
                <AppBarLogout />
            )}

            {loggedIn ? (
                <Drawer
                    variant={largeScreen ? 'permanent' : 'temporary'}
                    className={
                        largeScreen
                            ? clsx(classes.drawer, {
                                  [classes.drawerOpen]: open,
                                  [classes.drawerClose]: !open,
                              })
                            : undefined
                    }
                    classes={
                        largeScreen
                            ? {
                                  paper: clsx({
                                      [classes.drawerOpen]: open,
                                      [classes.drawerClose]: !open,
                                  }),
                              }
                            : undefined
                    }
                    open={largeScreen ? false : open}
                    onClose={getDrawlerOnClose}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? (
                                <ChevronRightIcon />
                            ) : (
                                <RemoveIcon />
                            )}
                        </IconButton>
                    </div>
                    {loadingRoute ? null : (
                        <div>
                            <MenuList handleRouting={handleRouting} />
                        </div>
                    )}
                </Drawer>
            ) : null}

            {loadingRoute ? (
                <Loading />
            ) : (
                <main
                    className={
                        noPadding ? classes.noPaddingContent : classes.content
                    }
                >
                    {children}
                </main>
            )}
        </div>
    );
});
