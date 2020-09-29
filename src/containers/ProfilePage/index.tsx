import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import BraftEditor from 'braft-editor';
// @material-ui/icons
// core components
import Footer from '../../components/Footer/AppFooter';

import {pageService} from '../../utils/pageService';
import Layout from '../../components/Navigation';
import Actions from './Actions';
import ReviewCard from '../../components/Review/ReviewCard';
import {Card, CardHeader, Container, Divider, Grid} from '@material-ui/core';
import MyHTML from '../Editor/MyHtml';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import {socialService} from '../../utils/socialService';
import {useDispatch} from 'react-redux';
import {alertActions} from '../../store/actions/alertActions';

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

    const [liked, setLiked] = useState(false);

    const [commented, setCommented] = useState(0);

    const [comments, setComments] = useState();

    const [portfolio, setPortfolio] = useState({
        firstName: 'David',
        lastName: 'Smith',
        avatarUrl: 'https://comp30002.blob.core.windows.net/image/viewB.jpg',
        title: 'Full stack developer',
        description: 'I am handsome.',
    });

    const [content, setContent] = useState();

    useEffect(() => {
        const username = match.params.username;

        // Check if user has a portfolio
        pageService
            .getPortfolio(username)
            .then((data) => {
                console.log('portfolio: ', data.portfolio);
                setPortfolio(data.portfolio);
                setContent(
                    BraftEditor.createEditorState(
                        data.portfolio.content !== null
                            ? data.portfolio.content
                            : null
                    ).toHTML()
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }, [match.params.username]);

    useEffect(() => {
        const username = match.params.username;

        pageService
            // @ts-ignore
            .getComments(username)
            .then((data: {[x: string]: React.SetStateAction<undefined>}) => {
                setComments(data['user-comment']);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, []);

    let commentComponents = null;
    // @ts-ignore
    // TODO: Fix @ts-ignore
    if (comments != null && comments.length > 0) {
        // TODO: Fix @ts-ignore
        // @ts-ignore
        commentComponents = comments.map((c) => (
            <Grid item xs={12}>
                <ReviewCard
                    author={c.username}
                    content={c.comment}
                    date={c.createdDate}
                    avatar={c.avatar}
                />
            </Grid>
        ));
    }

    const handleLike = async () => {
        try {
            const username = match.params.username;
            await socialService.likePortfolio(username);
            setLiked(true);
            dispatch(alertActions.success('You liked this portfolio'));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    const handleUnlike = async () => {
        try {
            const username = match.params.username;
            await socialService.unlikePortfolio(username);
            setLiked(false);
            dispatch(alertActions.success('You unliked this portfolio'));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };
    // TODO: Fix @ts-ignore
    // @ts-ignore
    return (
        <div className={classes.root}>
            <Layout>
                <Container maxWidth="md">
                    <Card variant={'outlined'}>
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
                            commented={commented}
                            handleLike={liked ? handleUnlike : handleLike}
                            handleComment={() => {
                                setCommented(commented + 1);
                            }}
                        />
                        <CardContent>
                            <Breadcrumbs aria-label="breadcrumb">
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
                            </Breadcrumbs>
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
                            </Grid>
                            <Divider className={classes.divider} />
                            <MyHTML html={content} />
                            <Grid container spacing={1}>
                                {commentComponents}
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            </Layout>
            <Footer />
        </div>
    );
}
