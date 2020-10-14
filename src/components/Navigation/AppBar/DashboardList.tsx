import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {withWidth, Tabs, Tab, CssBaseline} from '@material-ui/core';

import KeyIcon from '@material-ui/icons/VpnKey';
import FollowIcon from '@material-ui/icons/Grade';
import FaceIcon from '@material-ui/icons/Face';
import TagIcon from '@material-ui/icons/LocalOffer';
//import './dashboardList.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        pills: {
            color: '#555555',
            textTransform: 'none',

            opacity: '1',
            maxWidth: '100%',

            borderRadius: '4px',
        },

        primary: {
            '&,&:hover': {
                color: '#FFFFFF',
                backgroundColor: '#13a87c',
                boxShadow:
                    '0 0px 0px 0px rgba(0, 0, 0, 0.14), 0 0px 0px 0px rgba(156, 39, 176, 0.4)',
            },
        },

        tabWrapper: {
            color: 'inherit',
        },
    })
);

const routers = [
    {
        icon: <FaceIcon />,
        path: 'profile',
        name: 'Profile',
    },
    {
        icon: <FollowIcon />,
        path: 'follows',
        name: 'Follow',
    },
    {
        icon: <TagIcon />,
        path: 'tags',
        name: 'Tag',
    },
    {
        icon: <KeyIcon />,
        path: 'password',
        name: 'Change Password',
    },
];

const getIndex = (path: any) => {
    switch (path) {
        case '/dashboard/profile':
            return 0;
        case '/dashboard/password':
            return 3;
        case '/dashboard/follows':
            return 1;
        case '/dashboard/tags':
            return 2;
        default:
            return -1;
    }
};

/***
 * The layout of the application once login in.
 */
export default withWidth()(() => {
    const classes = useStyles();
    //const loadingRoute = false;
    const location = useLocation();
    const history = useHistory();

    const path = location.pathname;

    return (
        <div>
            <CssBaseline />
            <Tabs
                className={classes.root}
                value={getIndex(path)}
                onChange={(event: any, active: any) => {
                    history.push('/dashboard/' + routers[active].path);
                }}
                orientation="vertical"
            >
                {routers.map((prop: any, key: any) => {
                    return (
                        <Tab
                            key={key}
                            classes={{
                                root: classes.pills,
                                selected: classes.primary,
                                wrapper: classes.tabWrapper,
                            }}
                            label={prop.name}
                        ></Tab>
                    );
                })}
            </Tabs>
        </div>
    );
});
