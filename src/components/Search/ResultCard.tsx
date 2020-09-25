import React from 'react';
import {useHistory} from 'react-router-dom';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Hidden,
    Typography,
} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import IContent from './IContent';
import logoImage from '../../assets/logo.svg';

//import {useSelector} from 'react-redux';
//import {IRootState} from '../../index';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            marginRight: theme.spacing(2),
        },
        card: {
            display: 'flex',
        },
        cardDetails: {
            flex: 1,
        },
        cardMedia: {
            width: 160,
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

    return (
        <CardActionArea
            component="a"
            href="#"
            onClick={() => {
                console.log(content);
                setFlipped(true);
                // console.log(location.pathname);
                // if (location.pathname === '/') {
                //     history.push('/search/more');
                // } else {
                //     history.push(location.pathname + '/more');
                // }
                history.push('/portfolios/' + content.username);
            }}
        >
            <Card className={classes.card}>
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography component="h2" variant="h5">
                            {content.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {content.username}
                        </Typography>

                        <Typography variant="subtitle1" paragraph>
                            {content.description}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            style={{color: '#16a2e0'}}
                        >
                            Continue reading...
                        </Typography>
                    </CardContent>
                </div>
                <Hidden xsDown>
                    <CardMedia
                        className={classes.cardMedia}
                        image={logoImage}
                        title={'?'}
                    />
                </Hidden>
            </Card>
        </CardActionArea>
    );
};

/*         <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {content.username}
                </Typography>
                <Typography>{content.description}</Typography>
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
        </Card> */
