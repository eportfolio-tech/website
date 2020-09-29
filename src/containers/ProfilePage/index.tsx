import React, {useEffect, useState} from 'react';
// nodejs library that concatenates classes
//import classNames from 'classnames';
// @material-ui/core components
import {createStyles, makeStyles} from '@material-ui/core/styles';
import BraftEditor from 'braft-editor';
// @material-ui/icons
// core components
import Footer from '../../components/Footer/AppFooter';
//import Parallax from './Parallax';

import {pageService} from '../../utils/pageService';
import Layout from '../../components/Navigation';
import Actions from './Actions';
import MyHTML from '../Editor/MyHtml';
import {socialService} from '../../utils/socialService';
import {alertActions} from '../../store/actions';
import {useDispatch} from 'react-redux';

// @ts-ignore
const useStyles: any = makeStyles((theme: Theme) =>
    createStyles({
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
        name: {},
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
        },
    })
);

export default function ProfilePage({match, history}: any) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [liked, setLiked] = useState(false);

    //const [likeNum, setLikeNum] = useState(0);

    const [commented, setCommented] = useState(0);

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
    // @ts-ignore
    return (
        <div>
            <Layout>
                <div style={{minHeight: '100VH'}}>
                    <Actions
                        history={history}
                        liked={liked}
                        commented={commented}
                        handleLike={liked ? handleUnlike : handleLike}
                        handleComment={() => {
                            setCommented(commented + 1);
                        }}
                    />

                    <div className={classes.profile}>
                        <div>
                            <img src={portfolio.avatarUrl} alt="..." />
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
                    <br />
                    <br />
                    <MyHTML html={content} />
                </div>
            </Layout>
            <Footer />
        </div>
    );
}