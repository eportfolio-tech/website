import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import BraftEditor from 'braft-editor';
// @material-ui/icons
// core components
import Footer from '../../components/Footer/AppFooter';

import {pageService} from '../../utils/pageService';
import Layout from '../../components/Navigation';
import Actions from './Actions';

import {Card, CardHeader, Divider, Grid, Drawer} from '@material-ui/core';
import MyHTML from '../Editor/MyHtml';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import {socialService} from '../../utils/socialService';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {alertActions} from '../../store/actions/alertActions';
import Comments from './Comments';
import {IRootState} from '../../index';
// @ts-ignore
const useStyles: any = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            // backgroundColor: theme.palette.background.paper,
        },
        profile: {
            textAlign: 'center',
            '& img': {
                maxWidth: '160px',
                width: '100%',
            },
            marginTop: theme.spacing(10),
        },
        description: {
            margin: '1.071rem auto 0',
            maxWidth: '600px',
            color: '#999',
            textAlign: 'center',
        },
        // title: {
        //     color: '#3C4858',
        //     margin: '1.75rem 0 0.875rem',
        //     textDecoration: 'none',
        //     fontWeight: 700,
        //     fontFamily: `"Roboto Slab", "Times New Roman", serif`,
        //     display: 'inline-block',
        //     position: 'relative',
        //     marginTop: '30px',
        //     minHeight: '32px',
        // },
        // social: {
        //     margin: 'auto',
        //     textAlign: 'center',
        // },
        large: {
            width: theme.spacing(15),
            height: theme.spacing(15),
        },
        divider: {
            margin: theme.spacing(5),
        },
    })
);

export default function ProfilePage({match, history}: any) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const historyDom = useHistory();
    console.log(history);
    const loggedIn = useSelector<IRootState, boolean | undefined>(
        (state) => state.auth.loggedIn
    );
    const [openComment, setOpenComment] = useState(false);

    const [authorName] = useState(match.params.username);

    const [liked, setLiked] = useState(false);

    const [likeNum, setLikeNum] = useState(0);

    const [] = useState(0);

    const [comments, setComments] = useState();

    const [follower, setFollower] = useState(false);

    const [portfolio, setPortfolio] = useState({
        firstName: 'David',
        lastName: 'Smith',
        avatarUrl: 'https://comp30002.blob.core.windows.net/image/viewB.jpg',
        title: 'Full stack developer',
        description: 'I am handsome.',
    });

    const [content, setContent] = useState();

    useEffect(() => {
        fetchContent();
    }, [match.params.username]);

    const fetchContent = async () => {
        try {
            const username = match.params.username;

            //get portfolio
            const data = await pageService.getPortfolio(username);
            console.log('portfolio: ', data.portfolio);
            setPortfolio(data.portfolio);
            setContent(
                BraftEditor.createEditorState(
                    data.portfolio.content !== null
                        ? data.portfolio.content
                        : null
                ).toHTML()
            );

            //find who like this portfolio
            const comment = await pageService.getComments(username);
            setComments(comment['comments']);
            console.log(comment);

            //find comment of this portfolio
            const likeInfo = await socialService.findWhoLikedThisPortfolio(
                username
            );
            setLiked(likeInfo.liked);
            setLikeNum(likeInfo['user-like'].length);

            // find who follow this portfolio
            const follower = await socialService.findWhofollowedThisPortfolio(
                username
            );
            setFollower(follower.followed);
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    const handleLike = async () => {
        if (loggedIn) {
            try {
                const username = match.params.username;
                await socialService.likePortfolio(username);
                setLiked(true);
                setLikeNum(likeNum + 1);
            } catch (error) {
                dispatch(alertActions.error(error));
            }
        } else {
            historyDom.push('/?login=true');
        }
    };

    const handleUnlike = async () => {
        if (loggedIn) {
            try {
                const username = match.params.username;
                await socialService.unlikePortfolio(username);
                setLiked(false);
                setLikeNum(likeNum - 1);
            } catch (error) {
                dispatch(alertActions.error(error));
            }
        } else {
            historyDom.push('/?login=true');
        }
    };

    const handleFollow = async () => {
        if (loggedIn) {
            try {
                const username = match.params.username;
                // @ts-ignore
                await socialService.followPortfolio(username);
                // @ts-ignore
                setFollower(true);
                console.log(follower);
            } catch (error) {
                dispatch(alertActions.error(error));
            }
        } else {
            historyDom.push('/?login=true');
        }
    };

    const handleUnFollow = async () => {
        if (loggedIn) {
            try {
                const username = match.params.username;
                // @ts-ignore
                await socialService.unfollowPortfolio(username);
                // @ts-ignore
                setFollower(false);
            } catch (error) {
                dispatch(alertActions.error(error));
            }
        } else {
            historyDom.push('/?login=true');
        }
    };
    return (
        <div className={classes.root}>
            <Drawer
                anchor="right"
                open={openComment}
                onClose={() => {
                    setOpenComment(false);
                }}
            >
                <Grid container style={{width: '35VW'}}>
                    <Comments authorName={authorName} comments={comments} />
                </Grid>
            </Drawer>
            <Layout>
                <Card variant={'outlined'} style={{marginRight: '5%'}}>
                    <CardHeader
                        title={
                            <Typography variant={'h4'}>
                                {portfolio.title}
                            </Typography>
                        }
                        subheader={`${portfolio.firstName} ${portfolio.lastName}`}
                    />

                    <Divider />
                    <Actions
                        history={history}
                        liked={liked}
                        likeNum={likeNum}
                        commented={0}
                        follower={follower}
                        handleLike={liked ? handleUnlike : handleLike}
                        handleComment={() => {
                            setOpenComment(true);
                        }}
                        // @ts-ignore
                        handleFollow={follower ? handleUnFollow : handleFollow}
                    />
                    <CardContent>
                        {/* <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" href="/">
                                Material-UI
                            </Link>
                            <Link
                                color="inherit"
                                href="/getting-started/installation/"
                            >
                                Core
                            </Link>
                            <Typography color="textPrimary">
                                Breadcrumb
                            </Typography>
                        </Breadcrumbs> */}
                        <Grid
                            container
                            alignItems={'flex-start'}
                            justify={'center'}
                            direction="row"
                        >
                            <Grid item className={classes.profile}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={portfolio.avatarUrl}
                                    className={classes.large}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align={'center'} variant={'h3'}>
                                    {`${portfolio.firstName} ${portfolio.lastName}`}
                                </Typography>
                                <Typography
                                    align={'center'}
                                    variant={'subtitle1'}
                                    className={classes.description}
                                >
                                    {portfolio.description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <MyHTML html={content} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Layout>
            <Footer />
        </div>
    );
}
