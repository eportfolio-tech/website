import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
    IconButton,
    Divider,
    withWidth,
    isWidthUp,
    Typography,
    ListItemAvatar,
    Avatar,
    Tooltip,
} from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';

import {useDispatch} from 'react-redux';
import {socialService} from '../../../utils/socialService';
import {alertActions} from '../../../store/actions/alertActions';
import Loading from '../../../components/Loading/Loading';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        nested: {
            paddingLeft: '10%',
            width: '100%',
        },

        inline: {
            display: 'inline',
        },
    })
);

export default withWidth()(({width, isFollower}: any) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const largeScreen = isWidthUp('md', width);
    const userInfo = JSON.parse(localStorage.getItem('user') || 'null').user;
    const [avatars, setAvatars] = useState<any>(null);
    console.log(largeScreen);
    useEffect(() => {
        fetchFollow();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const fetchFollow = async () => {
        try {
            //get portfolio
            setAvatars(null);
            const fetch = isFollower
                ? socialService.findWhoFollowedThisPortfolio
                : socialService.findWhoIamFollowing;
            const data = await fetch(userInfo.username);
            console.log(data);
            if (isFollower) {
                setAvatars(data.followers);
            } else {
                setAvatars(data.following);
            }
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    const unFollowHandler = async (username: any) => {
        try {
            // const userInfo = JSON.parse(localStorage.getItem('user') || 'null');
            // const username = userInfo.user.username;
            // await authService.resetPassword(username, oldPassword, newPassword);
            // dispatch(alertActions.success('reset password succeed'));
            const data = await socialService.unFollowPortfolio(username);
            console.log(data);
            dispatch(alertActions.success('succeed'));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    const getUsername = (avatar: any) =>
        isFollower ? avatar.sourceUsername : avatar.destinationUsername;

    return (
        <List component="div" disablePadding>
            <Divider variant="inset" component="li" />
            {avatars && avatars.length > 0 ? (
                avatars.map((each: any) => (
                    <ListItem
                        button
                        alignItems="flex-start"
                        className={classes.nested}
                    >
                        <ListItemAvatar>
                            <Avatar>{getUsername(each)[0]}</Avatar>
                        </ListItemAvatar>

                        <ListItemText
                            primary={getUsername(each)}
                            secondary={
                                isFollower
                                    ? 'is following you'
                                    : 'click to check it out'
                            }
                        />
                        {isFollower ? null : (
                            <ListItemSecondaryAction>
                                <Tooltip
                                    title={
                                        <Typography variant="body2">
                                            remove
                                        </Typography>
                                    }
                                    placement="left"
                                >
                                    <IconButton
                                        edge="end"
                                        onClick={async () => {
                                            await unFollowHandler(
                                                getUsername(each)
                                            );
                                            fetchFollow();
                                        }}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        )}
                    </ListItem>
                ))
            ) : avatars === null ? (
                <Loading />
            ) : (
                <ListItem alignItems="flex-start">
                    <ListItemText primary="None" className={classes.nested} />
                </ListItem>
            )}
        </List>
    );
});
