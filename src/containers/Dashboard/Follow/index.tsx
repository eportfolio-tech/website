import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Grid, withWidth, isWidthUp} from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import FollowingIcon from '@material-ui/icons/Grade';
import FollowerIcon from '@material-ui/icons/PlaylistAddCheck';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import AvatarList from './AvatarList';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: theme.palette.background.default,
            marginTop: theme.spacing(5),
        },
        // resetButton: {
        //     marginTop: theme.spacing(3),
        //     marginRight: theme.spacing(2),
        //     marginDown: theme.spacing(3),
        //     textTransform: 'none',
        // },
        // cardTitle: {
        //     marginTop: theme.spacing(3),
        // },
        // cardTitleIcon: {
        //     marginTop: theme.spacing(3),
        //     color: '#f59002',
        // },
        listRoot: {
            width: '100%',

            backgroundColor: theme.palette.background.paper,
        },
    })
);

export default withWidth()(({width}: any) => {
    const classes = useStyles();
    const largeScreen = isWidthUp('md', width);

    const [openFollower, setOpenFollower] = React.useState(largeScreen);
    const [openFollowing, setOpenFollowing] = React.useState(largeScreen);

    return (
        <div className={classes.root}>
            <Grid container justify="space-around" spacing={2}>
                {/* <Grid item xs={10} md={12}>
                    <Typography variant={'subtitle2'}>
                        Use at least 8 characters. Don’t use a password from
                        another site or something too obvious like your pet’s
                        name.
                    </Typography>
                </Grid> */}
                <Grid item xs={12} md={6}>
                    <List
                        // subheader={
                        //     <ListSubheader
                        //         component="div"
                        //         id="nested-list-subheader"
                        //     >
                        //         <Typography variant={'h6'}>
                        //             My Following(s) and Follower(s)
                        //         </Typography>
                        //     </ListSubheader>
                        // }
                        className={classes.listRoot}
                    >
                        <ListItem
                            button
                            onClick={() => {
                                setOpenFollowing(!openFollowing);
                            }}
                        >
                            <ListItemIcon>
                                <FollowingIcon />
                            </ListItemIcon>
                            <ListItemText primary="I'm Following:" />
                            {openFollowing ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openFollowing}
                            timeout="auto"
                            unmountOnExit
                        >
                            <AvatarList />
                        </Collapse>
                    </List>
                </Grid>
                <Grid item xs={12} md={6}>
                    <List className={classes.listRoot}>
                        <ListItem
                            button
                            onClick={() => {
                                setOpenFollower(!openFollower);
                            }}
                        >
                            <ListItemIcon>
                                <FollowerIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Follower(s):" />
                            {openFollower ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openFollower}
                            timeout="auto"
                            unmountOnExit
                        >
                            <AvatarList isFollower />
                        </Collapse>
                    </List>
                </Grid>
            </Grid>
        </div>
    );
});
