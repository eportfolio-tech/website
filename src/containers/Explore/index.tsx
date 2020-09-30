import {Grid} from '@material-ui/core';
import React from 'react';
import Layout from '../../components/Navigation';
import Deck from './cards';
import JustifyDialog from './justifyDialog';

export default () => {
    const [config, setConfig] = React.useState({
        zoom: false,
        layout: true,
    });

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
                    <Deck zoom={config.zoom ? 1.1 : 1.0} />
                </Grid>
            </div>
        </Layout>
    );
};
