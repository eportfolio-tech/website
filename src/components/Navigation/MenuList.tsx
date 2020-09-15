import React from 'react';
import {useLocation} from 'react-router-dom';

import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {
    withWidth,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Grow,
} from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            marginLeft: theme.spacing(1),
        },
        item: {
            borderRadius: 50,
        },
    })
);

interface IMenuListProps {
    handleRouting: any;
}

/***
 * The layout of the application once login in.
 */
export default withWidth()(({handleRouting}: IMenuListProps) => {
    const classes = useStyles();
    const loadingRoute = false;
    const location = useLocation();

    const logOut = () => {
        localStorage.removeItem('user');
        window.location.reload(false);
    };
    const path = location.pathname;

    return (
        <div>
            <List>
                <Grow in={!loadingRoute} timeout={500}>
                    <ListItem
                        button
                        onClick={() => handleRouting('dashboard')}
                        selected={path === '/dashboard'}
                        className={classes.item}
                    >
                        <ListItemIcon className={classes.icon}>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </Grow>
                <Grow in={!loadingRoute} timeout={700}>
                    <ListItem
                        button
                        onClick={() => handleRouting('explore')}
                        selected={path === '/explore'}
                        className={classes.item}
                    >
                        <ListItemIcon className={classes.icon}>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Explore" />
                    </ListItem>
                </Grow>
            </List>

            <List>
                <Grow in={!loadingRoute} timeout={1100}>
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
                </Grow>
                <Grow in={!loadingRoute} timeout={1300}>
                    <ListItem button onClick={logOut} className={classes.item}>
                        <ListItemIcon className={classes.icon}>
                            <PowerSettingsNewIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </Grow>
            </List>
        </div>
    );
});
