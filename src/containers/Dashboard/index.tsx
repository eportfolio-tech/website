import React from 'react';
import {
    Tabs,
    Tab,
    CssBaseline,
    Grid,
    withWidth,
    isWidthUp,
} from '@material-ui/core';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {useHistory, useLocation} from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import KeyIcon from '@material-ui/icons/VpnKey';
import FollowIcon from '@material-ui/icons/Grade';
import FaceIcon from '@material-ui/icons/Face';
import TagIcon from '@material-ui/icons/LocalOffer';

import ResetPassword from './ResetPassword';
import UserTags from './UserTag';
import UpdateInfo from './UpdateInfo';
import Follow from './Follow';
import Layout from '../../components/Navigation';

// import TabContext from '@material-ui/lab/TabContext';
// import TabList from '@material-ui/lab/TabList';
// import TabPanel from '@material-ui/lab/TabPanel';
interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div style={{minHeight: '70VH'}}>{children}</div>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '100%',
        },
        vertical: {
            color: '#555555',
            textTransform: 'none',
            opacity: '1',
            width: '97%',
            borderRadius: '4px',
            borderTopLeftRadius: '50px',
            borderBottomLeftRadius: '50px',
        },
        horizontal: {
            color: '#555555',
            textTransform: 'none',
            opacity: '1',
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

        tabWrapper: {},
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

export default withWidth()(({width}: any) => {
    const classes = useStyles();

    const location = useLocation();
    const history = useHistory();

    const largeScreen = isWidthUp('md', width);

    const path = location.pathname;

    return (
        <Layout>
            <div className={classes.root}>
                <CssBaseline />
                <Grid container justify="center">
                    <Grid item xs={12} md={2}>
                        <div
                            style={
                                largeScreen
                                    ? {marginLeft: '0%', maxWidth: '200px'}
                                    : undefined
                            }
                        >
                            {' '}
                            <Tabs
                                className={classes.root}
                                value={getIndex(path)}
                                onChange={(event: any, active: any) => {
                                    history.push(
                                        '/dashboard/' + routers[active].path
                                    );
                                }}
                                orientation={
                                    largeScreen ? 'vertical' : 'horizontal'
                                }
                                variant="fullWidth"
                                centered={!largeScreen}
                                scrollButtons="auto"
                            >
                                {routers.map((prop: any, key: any) => {
                                    return (
                                        <Tab
                                            {...a11yProps(key)}
                                            classes={{
                                                root: largeScreen
                                                    ? classes.vertical
                                                    : classes.horizontal,
                                                selected: classes.primary,
                                                wrapper: classes.tabWrapper,
                                            }}
                                            label={
                                                largeScreen
                                                    ? prop.name
                                                    : prop.name
                                            }
                                        ></Tab>
                                    );
                                })}
                            </Tabs>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={1}></Grid>

                    <Grid item xs={10} md={8}>
                        <SwipeableViews
                            axis="x"
                            index={getIndex(path)}
                            onChangeIndex={(index: number) => {
                                history.push(
                                    '/dashboard/' + routers[index].path
                                );
                            }}
                        >
                            <TabPanel value={getIndex(path)} index={0}>
                                <UpdateInfo />
                            </TabPanel>
                            <TabPanel value={getIndex(path)} index={1}>
                                <Follow />
                            </TabPanel>
                            <TabPanel value={getIndex(path)} index={2}>
                                <UserTags />
                            </TabPanel>
                            <TabPanel value={getIndex(path)} index={3}>
                                <ResetPassword />
                            </TabPanel>
                        </SwipeableViews>
                    </Grid>
                </Grid>
            </div>
        </Layout>
    );
});
