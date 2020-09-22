import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    withWidth,
} from '@material-ui/core';
import {Breakpoint} from '@material-ui/core/styles/createBreakpoints';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';

const drawerWidth = 400;
const useStyles = makeStyles((theme: Theme) => ({
    logo: {
        maxHeight: '3rem',
    },
    link: {
        marginLeft: 'auto',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: 'rgba(250,250,250,0.3)',
        boxShadow: 'none',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 10,
    },
    hide: {
        display: 'none',
    },
    menuItem: {
        fontWeight: 900,
    },
}));

interface AppBarProps {
    width: Breakpoint;
    openDrawer?: Boolean;
    handleDrawerOpen?: any;
    handleDrawerClose?: any;
}

/***
 * The App Bar at the top.
 */
export default withWidth()(({handleDrawerOpen, openDrawer}: AppBarProps) => {
    const classes = useStyles();
    //const history = useHistory();
    //const location = useLocation();

    //const [avatarEL, setAvatarEL] = useState(null);

    return (
        <div>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: openDrawer,
                })}
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, {
                            [classes.hide]: openDrawer,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button></Button>
                    {/*
                    <div className={classes.link}>
                        <Button
                            className={classes.link}
                            onClick={(event: any) => {
                                setAvatarEL(event.currentTarget);
                            }}
                        >
                            <Avatar />
                        </Button>
                        <Menu
                            open={Boolean(avatarEL)}
                            keepMounted
                            anchorEl={avatarEL}
                            onClose={() => {
                                setAvatarEL(null);
                            }}
                        >
                            <MenuItem
                                className={classes.menuItem}
                                onClick={() => {
                                    localStorage.removeItem('user');
                                    window.location.reload(false);
                                }}
                            >
                                Logout
                            </MenuItem>
                        </Menu>
                            </div>*/}
                </Toolbar>
            </AppBar>
        </div>
    );
});
