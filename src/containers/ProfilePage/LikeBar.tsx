import React, {Component, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {useHistory, withRouter} from 'react-router-dom';
import {alertActions} from '../../store/actions/alertActions';

// @ts-ignore
import {userSocial} from '../../utils/userSocial';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
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

export default () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const ownerUsername = useState('');

    const onLikeHandler = async () => {
        try {
            await userSocial.findWhoLikedThisPortfolio(ownerUsername);
            dispatch(alertActions.success('You liked'));
        } catch (error) {
            dispatch(alertActions.error(error.response.data.errors));
        }
    };

    return (
        <div>
            <Grid item>
                <Fab color="primary" aria-label="like">
                    <FavoriteIcon onClick={onLikeHandler} />
                </Fab>
                <div>
                    <p> </p>
                </div>
            </Grid>
        </div>
    );
};
