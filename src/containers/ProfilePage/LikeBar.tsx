import React, {Component, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {useHistory, withRouter} from 'react-router-dom';
import {alertActions} from '../../store/actions/alertActions';

// @ts-ignore
import {userSocial} from '../../utils/userSocial';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {IconButton, Tooltip, Typography} from '@material-ui/core';
const styles = (theme: {
    palette: {background: {paper: any}};
    transitions: {
        create: (arg0: string, arg1: {duration: any}) => any;
        duration: {shortest: any};
    };
}) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    media: {
        height: 140,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});

interface IAction {
    history: any;
    handleLike?: any;
    handleComment?: any;
    handleShare?: any;
    liked?: boolean;
    commented?: number;
}

export default () => {
    const dispatch = useDispatch();

    const [userName, setUserName] = useState('');

    const onLikeHandler = async () => {
        try {
            await userSocial.findWhoLikedThisPortfolio(userName);
            dispatch(alertActions.success('You liked this portfolio'));
        } catch (error) {
            dispatch(alertActions.error('like failed'));
        }
    };

    return (
        <div>
            <Grid container justify="flex-end">
                <Tooltip
                    arrow
                    title={<Typography variant="body1">{'Like'}</Typography>}
                    placement="left"
                    interactive
                >
                    <IconButton
                        aria-label="like"
                        //color={liked ? 'secondary' : undefined}
                        onClick={onLikeHandler}
                    >
                        <FavoriteIcon />
                    </IconButton>
                </Tooltip>
                <br />
                <br />
            </Grid>
        </div>
    );
};
