import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Grid,
} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import FlipToFrontIcon from '@material-ui/icons/FlipToFront';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import StarsIcon from '@material-ui/icons/Stars';

import IContent from './IContent';

import {useSelector} from 'react-redux';
import {IRootState} from '../../index';

import logoImage from '../../assets/logo.svg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            marginRight: theme.spacing(2),
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        cardMedia: {
            paddingTop: '141.428%', // A4 size
        },
        cardContent: {
            flexGrow: 1,
        },
    })
);

interface IResultCard {
    content: IContent;
    setFlipped: any;
}

export default ({content, setFlipped}: IResultCard) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const loggedIn = useSelector<IRootState, boolean | undefined>(
        (state) => state.auth.loggedIn
    );

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                image={logoImage}
                title="Image title"
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {content.username}
                </Typography>
                <Typography>{content.content}</Typography>
            </CardContent>
            <CardActions>
                <Grid container justify="center" spacing={1}>
                    <Grid item xs={3}>
                        <IconButton
                            color="secondary"
                            onClick={() => {
                                setFlipped(true);
                                // console.log(location.pathname);
                                if (location.pathname === '/') {
                                    history.push('/search/more');
                                } else {
                                    history.push(location.pathname + '/more');
                                }
                            }}
                        >
                            <FlipToFrontIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton
                            style={{color: '#42a5f5'}}
                            onClick={() => {
                                if (!loggedIn) {
                                    return history.push('/login');
                                }
                            }}
                        >
                            <ThumbUpAltIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton
                            style={{color: '#f59002'}}
                            onClick={() => {
                                if (!loggedIn) {
                                    return history.push('/login');
                                }
                            }}
                        >
                            <StarsIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};
