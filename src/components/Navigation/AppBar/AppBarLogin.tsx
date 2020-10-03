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
} from '@material-ui/core';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import {useHistory} from 'react-router-dom';
import logoImage from '../../../assets/logo.svg';

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

            width: '100%',
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
        path: 'search?query=arts',
        matchPath: 'search',
        name: 'Search',
    },
    {
        icon: <EditIcon />,
        path: 'editor',
        matchPath: 'editor',
        name: 'Editor',
    },
    {
        icon: <SettingsIcon />,
        path: 'settings',
        matchPath: 'settings',
        name: 'Settings',
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
        case '/settings':
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
    const classes = useStyles();

    const handleChange = (event: any, active: any) => {
        history.push('/' + routers[active].path);
    };

    console.log(getIndex(history.location.pathname));
    return (
        <AppBar position="fixed" className={classes.appBar}>
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
                    <Grid item xs={4}>
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

                    <Grid item xs={7}>
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
