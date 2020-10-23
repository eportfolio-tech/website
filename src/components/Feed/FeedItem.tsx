import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Avatar from '@material-ui/core/Avatar';
import {
    Card,
    Container,
    // Divider,
    Grid,
    Avatar,
    CardContent,
    IconButton,
    CardActions,
    Chip,
    CardMedia,
} from '@material-ui/core';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import Typed from 'react-typed';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreIcon from '@material-ui/icons/MoreVert';
import {useHistory} from 'react-router-dom';

import {socialService} from '../../utils/socialService';
import {useDispatch} from 'react-redux';
import {alertActions} from '../../store/actions';
// @ts-ignore
import {CopyToClipboard} from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '50VW',
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
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
        avatar: {
            backgroundColor: red[500],
        },
        skeletonHeader: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        description: {
            color: '#999',
            marginTop: theme.spacing(1),
        },
    })
);

export default function FeedItem({activity, width}: any) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [liked, setLiked] = React.useState<any>(false);

    if (!activity) {
        console.log('nothing to render.');
        return <div></div>;
    }

    const handleLike = async (username: any) => {
        if (!liked) {
            try {
                await socialService.likePortfolio(username);
                setLiked(true);
                dispatch(
                    alertActions.success('Successfully liked this portfolio.')
                );
            } catch (error) {
                dispatch(alertActions.error(error));
            }
        } else {
            try {
                await socialService.unlikePortfolio(username);
                setLiked(false);
                dispatch(
                    alertActions.success('Successfully unLiked this portfolio.')
                );
            } catch (error) {
                dispatch(alertActions.error(error));
            }
        }
    };

    const getContainer = (activity: any) => {
        switch (activity.activityType) {
            case 'PORTFOLIO':
                return (
                    <Container>
                        <Grid container className={classes.skeletonHeader}>
                            {' '}
                            <Grid xs={3} md={1}>
                                <Avatar
                                    alt={activity.portfolio.username}
                                    src={activity.portfolio.username[0]}
                                    className={classes.avatar}
                                />
                            </Grid>
                            <Grid xs={9} md={11}>
                                <Typography variant={'h5'}>
                                    <Typed
                                        strings={[
                                            activity.portfolio.title + '^2000',
                                            activity.portfolio.username +
                                                '^500',
                                        ]}
                                        typeSpeed={80}
                                        loop
                                    ></Typed>
                                    {/* {`${portfolio.firstName} ${portfolio.lastName}`} */}
                                </Typography>
                            </Grid>{' '}
                        </Grid>

                        <div>
                            <CardContent>
                                {' '}
                                <CardMedia
                                    className={classes.media}
                                    image={activity.portfolio.coverImage}
                                    title="Paella dish"
                                />
                                <br />
                                <Typography
                                    variant={'body1'}
                                    className={classes.description}
                                >
                                    {activity.portfolio.description}
                                </Typography>
                            </CardContent>
                        </div>
                        <CardActions disableSpacing>
                            <IconButton
                                aria-label="more"
                                onClick={() => {
                                    history.push(
                                        '/portfolio/' +
                                            activity.portfolio.username
                                    );
                                }}
                            >
                                <MoreIcon />
                            </IconButton>
                            <IconButton
                                aria-label="add to favorites"
                                onClick={() => {
                                    handleLike(activity.portfolio.username);
                                }}
                            >
                                <FavoriteIcon
                                    color={liked ? 'secondary' : undefined}
                                />
                            </IconButton>
                            <CopyToClipboard
                                text={
                                    'http://dev.eportfolio.tech/portfolio/' +
                                    activity.portfolio.username
                                }
                                onCopy={() => {
                                    dispatch(
                                        alertActions.success(
                                            'URL have copied to your clipboard.'
                                        )
                                    );
                                }}
                            >
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </CopyToClipboard>
                        </CardActions>
                    </Container>
                );
            case 'TAG':
                return (
                    <Container>
                        <Grid container className={classes.skeletonHeader}>
                            {' '}
                            <Grid xs={3} md={1}>
                                <Avatar
                                    alt={activity.username}
                                    src={activity.username[0]}
                                    className={classes.avatar}
                                />
                            </Grid>
                            <Grid xs={9} md={11}>
                                <Typography variant={'h5'}>
                                    <Typed
                                        strings={[
                                            'by ' + activity.username + '^500',
                                        ]}
                                        typeSpeed={80}
                                        loop
                                    ></Typed>
                                    {/* {`${portfolio.firstName} ${portfolio.lastName}`} */}
                                </Typography>
                            </Grid>
                        </Grid>
                        <div>
                            <CardContent>
                                <Chip
                                    style={{height: '100%'}}
                                    label={
                                        <Typography variant={'h4'}>
                                            {activity.tag.name}
                                        </Typography>
                                    }
                                    color="secondary"
                                    icon={
                                        <Typography variant={'h5'}>
                                            #
                                        </Typography>
                                    }
                                />
                            </CardContent>
                        </div>
                        <CardActions disableSpacing>
                            <IconButton
                                aria-label="more"
                                onClick={() => {
                                    history.push(
                                        '/search?tag=' + activity.tag.name
                                    );
                                }}
                            >
                                <MoreIcon />
                            </IconButton>
                            <CopyToClipboard
                                text={
                                    'http://dev.eportfolio.tech/portfolio/' +
                                    activity.username
                                }
                                onCopy={() => {
                                    dispatch(
                                        alertActions.success(
                                            'URL have copied to your clipboard.'
                                        )
                                    );
                                }}
                            >
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </CopyToClipboard>
                        </CardActions>
                    </Container>
                );
            default:
                return <div></div>;
        }
    };
    return <Card style={{width: width + 'VW'}}>{getContainer(activity)}</Card>;
}
