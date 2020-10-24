import React from 'react';
import {Grid, isWidthUp, withWidth} from '@material-ui/core';

import Layout from '../../components/Navigation';
import Deck from './Deck';
import JustifyDialog from './justifyDialog';
import FeedsGrid from './FeedsGrid';

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

export default withWidth()(({width}: any) => {
    const dispatch = useDispatch();
    const largeScreen = isWidthUp('md', width);

    const [config, setConfig] = React.useState({
        zoom: false,
        layout: largeScreen,
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
                {largeScreen ? (
                    <div>
                        <JustifyDialog config={config} setConfig={setConfig} />
                        <br />
                    </div>
                ) : null}

                {activities && activities.length > 0 ? (
                    config.layout ? (
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            style={{height: '50VH'}}
                        >
                            <Deck
                                zoom={config.zoom ? 1.1 : 1.0}
                                activities={activities}
                                fetchFeed={fetchFeed}
                            />
                        </Grid>
                    ) : (
                        <FeedsGrid
                            activities={activities}
                            fetchFeed={fetchFeed}
                        />
                    )
                ) : null}
            </div>
        </Layout>
    );
});
