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
        },
    })
);

interface IMenuListProps {
    handleRouting: any;
    open?: any;
}

/***
 * The layout of the application once login in.
 */
export default withWidth()(({handleRouting, open}: IMenuListProps) => {
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
                <Tooltip
                    arrow
                    title={<Typography variant="body1">{'Home'}</Typography>}
                    placement="right"
                    disableHoverListener={open}
                    interactive
                >
                    <ListItem
                        button
                        onClick={() => handleRouting('')}
                        selected={path === '/'}
                        className={classes.item}
                    >
                        <ListItemIcon className={classes.icon}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Tooltip>
                <Tooltip
                    arrow
                    title={<Typography variant="body1">{'Explore'}</Typography>}
                    placement="right"
                    disableHoverListener={open}
                    interactive
                >
                    <ListItem
                        button
                        onClick={() => handleRouting('explore')}
                        selected={path === '/explore'}
                        className={classes.item}
                    >
                        <ListItemIcon className={classes.icon}>
                            <ExploreIcon />
                        </ListItemIcon>
                        <ListItemText primary="Explore" />
                    </ListItem>
                </Tooltip>
                <Tooltip
                    arrow
                    title={<Typography variant="body1">{'Search'}</Typography>}
                    placement="right"
                    disableHoverListener={open}
                    interactive
                >
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
                </Tooltip>
                <Tooltip
                    arrow
                    title={<Typography variant="body1">{'Editor'}</Typography>}
                    placement="right"
                    disableHoverListener={open}
                    interactive
                >
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
                </Tooltip>
            </List>

            <List>
                <Tooltip
                    arrow
                    title={
                        <Typography variant="body1">{'Settings'}</Typography>
                    }
                    placement="right"
                    disableHoverListener={open}
                    interactive
                >
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
                </Tooltip>
                <Tooltip
                    arrow
                    title={<Typography variant="body1">{'Logout'}</Typography>}
                    placement="right"
                    disableHoverListener={open}
                    interactive
                >
                    <ListItem button onClick={logOut} className={classes.item}>
                        <ListItemIcon className={classes.icon}>
                            <PowerSettingsNewIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </Tooltip>
            </List>
        </div>
    );
});
