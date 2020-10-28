import React, {useEffect, useState} from 'react';
//import {createStyles, makeStyles} from '@material-ui/core/styles';
import BraftEditor from 'braft-editor';
// @material-ui/icons
// core components
import Footer from '../../components/Footer/AppFooter';

import {pageService} from '../../utils/pageService';
import Layout from '../../components/Navigation';
import Actions from './Actions';

import {socialService} from '../../utils/socialService';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {alertActions, pageActions} from '../../store/actions';
import {IRootState} from '../../index';
import CommentDialog from './CommentDialog';
import Profile from '../../components/Profile';

export default function ProfilePage({match, history, forceUpdate}: any) {
    const dispatch = useDispatch();

    const historyDom = useHistory();
    const authorName = match.params.username;

    const loggedIn = useSelector<IRootState, boolean | undefined>(
        (state) => state.auth.loggedIn
    );
    const [openComment, setOpenComment] = useState(false);

    const [liked, setLiked] = useState(false);

    const [likeNum, setLikeNum] = useState(0);

    const [comments, setComments] = useState();

    const [follower, setFollower] = useState(false);

    const [portfolio, setPortfolio] = useState(null);

    const [content, setContent] = useState();

    useEffect(() => {
        fetchContent();
        fetchComment();
        fetchLike();
        fetchFollow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.username]);

    const fetchContent = async () => {
        try {
            const username = match.params.username;

            //get portfolio
            const data = await pageService.getPortfolio(username);
            console.log('portfolio: ', data.portfolio);
            await pageActions.sleep(500);
            setPortfolio(data.portfolio);
            setContent(
                BraftEditor.createEditorState(
                    data.portfolio.content !== null
                        ? data.portfolio.content
                        : null
                ).toHTML()
            );
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    const fetchComment = async () => {
        try {
            //find comment of this portfolio
            const comment = await pageService.getComments(
                match.params.username
            );
            setComments(comment['comments']);
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    const fetchLike = async () => {
        try {
            //find who like this portfolio
            const likeInfo = await socialService.findWhoLikedThisPortfolio(
                match.params.username
            );
            setLiked(likeInfo.liked);
            setLikeNum(likeInfo['user-like'].length);
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    const fetchFollow = async () => {
        try {
            // find who follow this portfolio
            const follower = await socialService.findWhoFollowedThisPortfolio(
                match.params.username
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
                dispatch(
                    alertActions.success('You have followed this portfolio.')
                );
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
                await socialService.unFollowPortfolio(username);
                // @ts-ignore
                setFollower(false);
                dispatch(
                    alertActions.success('You have unfollowed this portfolio.')
                );
            } catch (error) {
                dispatch(alertActions.error(error));
            }
        } else {
            historyDom.push('/?login=true');
        }
    };
    return (
        <div>
            <Layout>
                <div>
                    <CommentDialog
                        authorName={authorName}
                        comments={comments}
                        openComment={openComment}
                        setOpenComment={setOpenComment}
                        loggedIn={loggedIn}
                        username={match.params.username}
                        fetchComment={fetchComment}
                    />
                    <Actions
                        history={history}
                        liked={liked}
                        likeNum={likeNum}
                        comments={comments}
                        follower={follower}
                        handleLike={liked ? handleUnlike : handleLike}
                        handleComment={() => {
                            setOpenComment(true);
                            //console.log(comments);
                        }}
                        handleFollow={follower ? handleUnFollow : handleFollow}
                        audioSrc={
                            'https://comp30002.blob.core.windows.net/image/cocabona,Glimlip-Drops.mp3'
                        }
                    />
                    <Profile
                        portfolio={portfolio}
                        content={content}
                        height={76}
                    />
                </div>
            </Layout>
            <Footer />
        </div>
    );
}
