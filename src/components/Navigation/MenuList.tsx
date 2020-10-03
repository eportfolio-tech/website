import React from 'react';
import {useLocation} from 'react-router-dom';

import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {
    withWidth,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography,
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            marginLeft: theme.spacing(1),
        },
        item: {
            borderRadius: 10,

            [theme.breakpoints.down('sm')]: {
                minWidth: '263px',
            },
            [theme.breakpoints.between('sm', 'md')]: {
                minWidth: '263px',
            },
        },
        root: {},
    })
);

interface IMenuListProps {
    handleRouting: any;
    openDrawer?: any;
}

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
];

/***
 * The layout of the application once login in.
 */
export default withWidth()(({handleRouting, openDrawer}: IMenuListProps) => {
    const classes = useStyles();
    //const loadingRoute = false;
    const location = useLocation();

    const logOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload(false);
    };
    const path = location.pathname;

    return (
        <div>
            <List className={classes.root}>
                {routers.map((route) => (
                    <ListItem
                        button
                        onClick={() => handleRouting(route.path)}
                        selected={path === '/' + route.matchPath}
                        className={classes.item}
                    >
                        <Tooltip
                            arrow
                            title={
                                <Typography variant="body1">
                                    {route.name}
                                </Typography>
                            }
                            placement="right"
                            interactive
                            disableHoverListener={openDrawer}
                        >
                            <ListItemIcon className={classes.icon}>
                                {route.icon}
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary={route.name} />
                    </ListItem>
                ))}
            </List>

            <List>
                <ListItem
                    button
                    onClick={() => handleRouting('settings')}
                    selected={path === '/settings'}
                    className={classes.item}
                >
                    <ListItemIcon className={classes.icon}>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>

                <ListItem button onClick={logOut} className={classes.item}>
                    <ListItemIcon className={classes.icon}>
                        <PowerSettingsNewIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );
});
