import {Grid} from '@material-ui/core';
import React from 'react';
import Layout from '../../components/Navigation';
import Deck from './cards';
import JustifyDialog from './justifyDialog';

import {socialService} from '../../utils/socialService';
import {useDispatch} from 'react-redux';
import {alertActions} from '../../store/actions';

function shuffle(a: Array<any>) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export default () => {
    const dispatch = useDispatch();
    const [config, setConfig] = React.useState({
        zoom: false,
        layout: true,
    });
    const [activities, setActivities] = React.useState<any>(null);

    React.useEffect(() => {
        fetchFeed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchFeed = async () => {
        try {
            //find comment of this portfolio
            setActivities(null);
            const results = await socialService.feed();
            setActivities(shuffle(results.activities));
            console.log(shuffle(results.activities));
        } catch (error) {
            //console.log(error);
            dispatch(alertActions.error(error));
        }
    };

    return (
        <Layout>
            <div>
                <JustifyDialog config={config} setConfig={setConfig} />

                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    style={{height: '50VH'}}
                >
                    {activities ? (
                        <Deck
                            zoom={config.zoom ? 1.1 : 1.0}
                            activities={activities}
                            fetchFeed={fetchFeed}
                        />
                    ) : null}
                </Grid>
            </div>
        </Layout>
    );
};
