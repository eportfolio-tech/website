import React from 'react';
import {useLocation} from 'react-router-dom';

import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {
    withWidth,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            marginLeft: theme.spacing(1),
        },
        item: {
            borderRadius: 10,
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
            <List>
                <ListItem
                    button
                    onClick={() => handleRouting('editor')}
                    selected={path === '/editor'}
                    className={classes.item}
                >
                    <ListItemIcon className={classes.icon}>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Editor" />
                </ListItem>

                <ListItem
                    button
                    onClick={() => handleRouting('search')}
                    selected={path === '/search'}
                    className={classes.item}
                >
                    <ListItemIcon className={classes.icon}>
                        <SearchIcon />
                    </ListItemIcon>
                    <ListItemText primary="Search" />
                </ListItem>
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
