import React, {Component, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {useHistory, withRouter} from 'react-router-dom';
import {alertActions} from '../../store/actions/alertActions';

// @ts-ignore
import {userSocial} from '../../utils/userSocial';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Drawer, IconButton, Tooltip, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {Theme} from 'material-ui';
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

const useStyles: any = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // @ts-ignore
            width: theme.spacing(25) + 1,
            position: 'fixed',
            backgroundColor: 'rgba(250,250,250,0)',
            zIndex: 1,
            top: '30VH',
            right: 0,
            whiteSpace: 'nowrap',
            border: 'none',
        },
    })
);
export default () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    // @ts-ignore
    const open = true;
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
            <Drawer
                classes={{
                    paper: clsx({
                        [classes.root]: open,
                    }),
                }}
                variant="permanent"
                anchor="right"
            >
                <Grid container justify="flex-end">
                    <Tooltip
                        arrow
                        title={
                            <Typography variant="body1">{'Like'}</Typography>
                        }
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
            </Drawer>
        </div>
    );
};
