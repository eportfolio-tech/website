import React, {
    useState,
    ReactChildren,
    ReactChild,
    useEffect,
    Fragment,
} from 'react';
import {useHistory} from 'react-router-dom';

import {
    makeStyles,
    useTheme,
    createStyles,
    Theme,
} from '@material-ui/core/styles';
import {
    Drawer,
    CssBaseline,
    IconButton,
    withWidth,
    isWidthUp,
} from '@material-ui/core';
import {Breakpoint} from '@material-ui/core/styles/createBreakpoints';
import RemoveIcon from '@material-ui/icons/Remove';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CancelIcon from '@material-ui/icons/Cancel';

import {useSelector, useDispatch} from 'react-redux';
import {alertActions} from '../../store/actions/alertActions';
import {IRootState} from '../../index';
import {useSnackbar} from 'notistack';
import clsx from 'clsx';

import AppBarLogin from './AppBar/AppBarLogin';
import AppBarLogout from './AppBar/AppBarLogout';
import Loading from './Loading';
import MenuList from './MenuList';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
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
export default withWidth()(({children, width, noPadding}: ILayoutProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const history = useHistory();
    const largeScreen = isWidthUp('lg', width);

    const loggedIn = useSelector<IRootState, boolean | undefined>(
        (state) => state.auth.loggedIn
    );

    const alert = useSelector<IRootState, any>((state) => state.alert);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const loadingRoute = useSelector<IRootState, boolean | undefined | null>(
        (state) => state.page.loading
    );

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

    const getAnchorOrigin = (type: any): any => {
        switch (type) {
            case 'success':
                return {
                    vertical: 'bottom',
                    horizontal: 'right',
                };

            default:
                return {
                    vertical: 'top',
                    horizontal: 'center',
                };
        }
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
                anchorOrigin: getAnchorOrigin(alert.type),
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
                    <div>
                        <MenuList handleRouting={handleRouting} />
                    </div>
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
