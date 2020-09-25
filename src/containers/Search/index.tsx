import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {useSpring, animated as a} from 'react-spring';
import {useDispatch} from 'react-redux';
import {useTheme} from '@material-ui/core';

import {userService} from '../../utils/userService';
import {alertActions} from '../../store/actions/alertActions';

import Results from '../../components/Search/Results';
import SearchBar from '../../components/Search/SearchBar';
import IContent from '../../components/Search/IContent';
import Layout from '../../components/Navigation';
import Profile from '../../components/ProfilePage/ProfilePage';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default () => {
    const location = useLocation();
    const history = useHistory();
    const theme = useTheme();
    const dispatch = useDispatch();
    const query = useQuery();

    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState<undefined | IContent[]>();

    const [flipped, setFlipped] = useState(
        location.pathname === '/search/more'
    );

    const {transform, opacity}: any = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: {mass: 5, tension: 500, friction: 80},
    });

    const searchStyle: React.CSSProperties = {
        opacity: opacity.interpolate((o: any) => 1 - o),
        transform,
    };

    const moreStyle: React.CSSProperties = {
        opacity,
        transform: transform.interpolate((t: any) => `${t} rotateX(180deg)`),
        background: theme.palette.background.default,
        height: '50VH',
        width: '100%',
    };

    const search = async (query: any) => {
        try {
            setLoading(true);
            setCards(undefined);

            const results = await userService.search(query, 0, 100);

            await sleep(500);
            console.log(results);
            setCards(results.content);
            setLoading(false);
        } catch (error) {
            dispatch(
                alertActions.error(Object.values(error.response.data.data))
            );

            setLoading(false);
        }
    };

    useEffect(() => {
        if (query.get('query')) {
            search(query.get('query'));
        }
    }, [query.get('query')]);

    return (
        <Layout>
            <div>
                {flipped ? (
                    <a.div
                        style={moreStyle}
                        onClick={() => {
                            setFlipped(false);
                            history.push('/search');
                        }}
                    >
                        <Profile />
                    </a.div>
                ) : (
                    <a.div style={searchStyle}>
                        <SearchBar />
                        <br />
                        <br />
                        <Results
                            setFlipped={setFlipped}
                            loading={loading}
                            cards={cards}
                        />
                    </a.div>
                )}
            </div>
        </Layout>
    );
};
