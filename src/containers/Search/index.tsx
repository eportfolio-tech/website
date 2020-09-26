import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {userService} from '../../utils/userService';
import {alertActions} from '../../store/actions/alertActions';

import Results from '../../components/Search/Results';
import SearchBar from '../../components/Search/SearchBar';
import IContent from '../../components/Search/IContent';
import Layout from '../../components/Navigation';

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
    const dispatch = useDispatch();
    const query = useQuery();

    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState<undefined | IContent[]>();

    const [] = useState(location.pathname === '/search/more');

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
                <SearchBar />
                <br />
                <br />
                <Results loading={loading} cards={cards} />
            </div>
        </Layout>
    );
};
