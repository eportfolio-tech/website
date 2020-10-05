import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {userService} from '../../utils/userService';
import {alertActions} from '../../store/actions/alertActions';

import Results from '../../components/Search/Results';
import SearchBar from '../../components/Search/SearchBar';
import IContent from '../../components/Search/IContent';
import Layout from '../../components/Navigation';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default () => {
    // const location = useLocation();
    const dispatch = useDispatch();
    const query = useQuery();

    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState<undefined | IContent[]>();

    const queryKeyword = query.get('query');
    const queryTag = query.get('tag');

    useEffect(() => {
        const search = async () => {
            try {
                setLoading(true);
                setCards(undefined);

                let results = {
                    content: undefined,
                };

                if (queryTag) {
                    results = await userService.searchTag(queryTag, 0, 100);
                } else {
                    results = await userService.searchKeyword(
                        queryKeyword,
                        0,
                        100
                    );
                }

                //await sleep(500);
                console.log(results);
                setCards(results.content);
                setLoading(false);
            } catch (error) {
                dispatch(alertActions.error(error));

                setLoading(false);
            }
        };
        if (queryKeyword || queryTag) {
            search();
        }
    }, [dispatch, queryKeyword, queryTag]);

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
