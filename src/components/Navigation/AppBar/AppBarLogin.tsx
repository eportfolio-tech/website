import React from 'react';
import {withStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    IconButton,
    withWidth,
    isWidthUp,
    Tooltip,
} from '@material-ui/core';
import {Breakpoint} from '@material-ui/core/styles/createBreakpoints';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import logoImage from '../../../assets/logo.svg';
import LogoContent from './LogoContent';

const drawerWidth = 400;
const useStyles = makeStyles((theme: Theme) => ({
    logo: {
        maxHeight: '4rem',
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
        backgroundColor: 'transparent',
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
    toolbarTitle: {
        background: theme.palette.background.default,
        borderRadius: 10,
    },
}));

const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',

        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

interface AppBarProps {
    width: Breakpoint;
    openDrawer?: Boolean;
    handleDrawerOpen?: any;
    handleDrawerClose?: any;
}

/***
 * The App Bar at the top.
 */
export default withWidth()(
    ({handleDrawerOpen, width, openDrawer}: AppBarProps) => {
        const classes = useStyles();
        //const history = useHistory();
        //const location = useLocation();
        const largeScreen = isWidthUp('lg', width);
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
                        {largeScreen ? (
                            <HtmlTooltip
                                title={<LogoContent />}
                                arrow
                                placement="right-end"
                                interactive
                                PopperProps={{
                                    popperOptions: {
                                        modifiers: {
                                            offset: {
                                                enabled: true,
                                                offset: '100px, 0px',
                                            },
                                        },
                                    },
                                }}
                                style={{maxWidth: 'none'}}
                            >
                                <img
                                    className={classes.logo}
                                    src={logoImage}
                                    alt="logo"
                                />
                            </HtmlTooltip>
                        ) : (
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
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
);
