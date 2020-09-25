import React, {useEffect, useState} from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import {createStyles, makeStyles} from '@material-ui/core/styles';
// @material-ui/icons
// core components
import Footer from '../Footer/AppFooter';
import Parallax from './Parallax';
import Button from '../Button/Button';

import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import {Grid} from '@material-ui/core';
import {pageService} from '../../utils/pageService';
import Layout from '../Navigation';

// @ts-ignore
const useStyles: any = makeStyles((theme: Theme) =>
    createStyles({
        profile: {
            textAlign: 'center',
            '& img': {
                maxWidth: '160px',
                width: '100%',
                margin: '0 auto',
                transform: 'translate3d(0, -50%, 0)',
            },
        },
        description: {
            margin: '1.071rem auto 0',
            maxWidth: '600px',
            color: '#999',
            textAlign: 'center',
        },
        name: {
            marginTop: '-80px',
        },
        imgFluid: {
            maxWidth: '100%',
            height: '160px',
        },
        imgRoundedCircle: {
            borderRadius: '50% !important',
        },
        imgRaised: {
            boxShadow:
                '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
        },
        title: {
            color: '#3C4858',
            margin: '1.75rem 0 0.875rem',
            textDecoration: 'none',
            fontWeight: 700,
            fontFamily: `"Roboto Slab", "Times New Roman", serif`,
            display: 'inline-block',
            position: 'relative',
            marginTop: '30px',
            minHeight: '32px',
        },
        social: {
            margin: 'auto',
            textAlign: 'center',
            marginBottom: '50px',
        },
    })
);

export default function ProfilePage(props: {[x: string]: any}) {
    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    const [portfolio, setPortfolio] = useState({
        firstName: 'David',
        lastName: 'Smith',
        avatarUrl: 'https://comp30002.blob.core.windows.net/image/viewB.jpg',
        title: 'Full stack developer',
        description: 'I am handsome.',
    });

    useEffect(() => {
        const username = props.match.params.username;

        // Check if user has a portfolio
        pageService
            .getPortfolio(username)
            .then((data) => {
                // console.log('portfolio: ', data.portfolio);
                setPortfolio(data.portfolio);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // @ts-ignore
    return (
        <div>
            <Layout>
                <div>
                    <Parallax
                        small
                        filter
                        image="https://comp30002.blob.core.windows.net/image/viewB.jpg"
                    />
                    <div className={classes.profile}>
                        <div>
                            <img
                                src={portfolio.avatarUrl}
                                alt="..."
                                className={imageClasses}
                            />
                        </div>
                        <div className={classes.name}>
                            <h1
                                className={classes.title}
                            >{`${portfolio.firstName} ${portfolio.lastName}`}</h1>
                            <h2>{portfolio.title}</h2>
                        </div>
                    </div>
                    <div className={classes.description}>
                        <p>{portfolio.description}</p>
                    </div>
                    <div>
                        <Grid
                            container
                            className={classes.social}
                            alignContent="center"
                            spacing={2}
                            justify="center"
                        >
                            <Grid item>
                                <Fab color="primary" aria-label="like">
                                    <FavoriteIcon />
                                </Fab>
                            </Grid>
                            <Grid item>
                                <Fab color="primary" aria-label="share">
                                    <ShareIcon />
                                </Fab>
                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        <Grid
                            container
                            className={classes.social}
                            alignContent="center"
                            spacing={2}
                            justify="center"
                        >
                            <Grid item>
                                <Button
                                    color="primary"
                                    aria-label="comment"
                                    variant="contained"
                                >
                                    <CommentOutlinedIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Layout>
            <Footer />
        </div>
    );
}
