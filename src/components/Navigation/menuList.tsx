import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { useLocation } from 'react-router-dom';

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';

//import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';
//import TimelineIcon from "@material-ui/icons/Timeline";
import { Grow } from '@material-ui/core';

//const drawerWidth = 240;

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
export default withWidth()(({ handleRouting }: IMenuListProps) => {
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
                        <ListItemText primary='Dashboard' />
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
                        <ListItemText primary='explore' />
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
                        <ListItemText primary='Settings' />
                    </ListItem>
                </Grow>
                <Grow in={!loadingRoute} timeout={1300}>
                    <ListItem button onClick={logOut} className={classes.item}>
                        <ListItemIcon className={classes.icon}>
                            <PowerSettingsNewIcon />
                        </ListItemIcon>
                        <ListItemText primary='Log out' />
                    </ListItem>
                </Grow>
            </List>
        </div>
    );
});
