import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    withWidth,
    createStyles,
    Tooltip,
    Typography,
    Grid,
    Link,
    isWidthUp,
    Popover,
} from '@material-ui/core';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
//import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import {useHistory} from 'react-router-dom';
import logoImage from '../../../assets/logo.svg';

import DashboardList from './DashboardList';
// const drawerWidth = 400;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {background: 'rgba(250,250,250,0.9)'},
        root: {
            marginTop: theme.spacing(1),
            textTransform: 'none',
            fontSize: '12px',
            fontWeight: 500,
            position: 'relative',
            display: 'block',
        },
        toolbar: {},

        toolbarTitle: {
            flexGrow: 1,

            marginLeft: theme.spacing(10),
        },
        logo: {
            maxHeight: '3rem',
        },
        pills: {
            float: 'left',
            position: 'relative',
            display: 'block',
            minWidth: '100px',
            textAlign: 'center',
            transition: 'all .3s',
            padding: '10px 15px',
            color: '#555555',
            height: 'auto',
            opacity: '1',
            maxWidth: '100%',
            margin: '0 5px',
            borderRadius: '4px',
        },

        primary: {
            '&,&:hover': {
                color: '#FFFFFF',
                backgroundColor: '#13a87c',
                boxShadow:
                    '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(156, 39, 176, 0.4)',
            },
        },
        alignCenter: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        tabWrapper: {
            color: 'inherit',
            position: 'relative',
            fontSize: '24px',
            lineHeight: '30px',
            fontWeight: 500,
            textTransform: 'uppercase',
            '&,& *': {
                letterSpacing: 'normal',
            },
        },
        logout: {
            marginTop: theme.spacing(1),
        },
        popover: {
            marginTop: theme.spacing(0.5),
        },
    })
);

const routers = [
    {
        icon: <HomeIcon />,
        path: '',
        matchPath: '',
        name: 'Home',
    },
    {
        icon: <ExploreIcon />,
        path: 'explore',
        matchPath: 'explore',
        name: 'Explore',
    },
    {
        icon: <SearchIcon />,
        path: 'search',
        matchPath: 'search',
        name: 'Search',
    },
    {
        icon: <EditIcon />,
        path: 'editor',
        matchPath: 'editor',
        name: 'Edit My E-Portfolio',
    },
];

const getIndex = (path: any) => {
    switch (path) {
        case '/':
            return 0;
        case '/explore':
            return 1;
        case '/search':
            return 2;
        case '/editor':
            return 3;
        case '/dashboard':
            return 4;
        case '/dashboard/profile':
            return 4;
        case '/dashboard/password':
            return 4;
        case '/dashboard/follows':
            return 4;
        case '/dashboard/tags':
            return 4;
        default:
            return -1;
    }
};

/***
 * The App Bar at the top.
 */
export default withWidth()(({width, handleDrawerOpen}: any) => {
    //const classes = useStyles();
    const history = useHistory();
    const largeScreen = isWidthUp('md', width);
    const extraLgScreen = isWidthUp('lg', width);
    const classes = useStyles();

    //Popover hooks and functions
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    //handle Tabs change
    const handleChange = (event: any, active: any) => {
        console.log(active);
        if (active === 4) return handleClick(event);
        history.push('/' + routers[active].path);
    };

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                className={classes.popover}
            >
                <DashboardList />
            </Popover>
            {!largeScreen ? (
                <Grid container justify="center">
                    <Button
                        aria-label="open drawer"
                        fullWidth
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </Button>
                </Grid>
            ) : (
                <Grid container>
                    {extraLgScreen ? (
                        <Grid item xs={5}>
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
                                    <Typography
                                        variant="h6"
                                        style={{fontWeight: 800}}
                                    >
                                        Forty-Two
                                    </Typography>
                                </Button>
                            </Link>
                        </Grid>
                    ) : (
                        <Grid item xs={2}></Grid>
                    )}

                    <Grid item md={8} lg={6}>
                        <Toolbar>
                            <Tabs
                                className={classes.root}
                                value={getIndex(history.location.pathname)}
                                onChange={handleChange}
                                centered
                            >
                                {routers.map((prop: any, key: any) => {
                                    return (
                                        <Tooltip
                                            arrow
                                            title={
                                                <Typography variant="body1">
                                                    {prop.name}
                                                </Typography>
                                            }
                                            placement="bottom"
                                            interactive
                                        >
                                            <Tab
                                                icon={prop.icon}
                                                key={key}
                                                classes={{
                                                    root: classes.pills,
                                                    selected: classes.primary,
                                                    wrapper: classes.tabWrapper,
                                                }}
                                            ></Tab>
                                        </Tooltip>
                                    );
                                })}
                                <Tooltip
                                    arrow
                                    title={
                                        <Typography variant="body1">
                                            Dashboard
                                        </Typography>
                                    }
                                    placement="bottom"
                                >
                                    <Tab
                                        icon={<DashboardIcon />}
                                        key={4}
                                        classes={{
                                            root: classes.pills,
                                            selected: classes.primary,
                                            wrapper: classes.tabWrapper,
                                        }}
                                    ></Tab>
                                </Tooltip>
                            </Tabs>
                        </Toolbar>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip
                            arrow
                            title={
                                <Typography variant="body1">Logout</Typography>
                            }
                            placement="bottom"
                            interactive
                        >
                            <IconButton
                                onClick={() => {
                                    localStorage.removeItem('user');
                                    localStorage.removeItem('token');
                                    window.location.reload(false);
                                }}
                                className={classes.logout}
                            >
                                <PowerSettingsNewIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            )}
        </AppBar>
    );
});
