import {Grid} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';

import Layout from '../../components/Navigation';
import Deck from './cards';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default () => {
    return (
        <Layout>
            <Grid
                style={{height: '70VH'}}
                container
                justify="center"
                alignItems="center"
            >
                <Deck />
            </Grid>
        </Layout>
    );
};
