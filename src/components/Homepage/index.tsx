// --- Post bootstrap -----
import React from 'react';

import TagGrids from './TagGrids';
//import ProductSmokingHero from './About';
import AppFooter from '../Footer/AppFooter';
import Search from './Search';
import HowItWorks from './HowItWorks';
import Subscribe from './Subscribe';
import Layout from '../Navigation';
import WaveBorder from './waveBorder';
import {useTheme} from '@material-ui/core/styles';

function Index() {
    const theme = useTheme();
    return (
        <div>
            <Layout noPadding>
                <div>
                    <Search />
                    {/*<ProductValues />*/}
                    <TagGrids />
                    <WaveBorder
                        lowerColor={'#bcffeb'}
                        upperColor={theme.palette.background.default}
                        animationNegativeDelay={30}
                    />
                    <HowItWorks />
                    <WaveBorder
                        upperColor={'#bcffeb'}
                        lowerColor={theme.palette.background.default}
                        animationNegativeDelay={100}
                    />
                    <Subscribe />
                </div>
            </Layout>
            <AppFooter />
        </div>
    );
}

export default Index;
