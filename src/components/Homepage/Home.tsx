// --- Post bootstrap -----
import React from 'react';
import TagGrids from './TagGrids';
//import ProductSmokingHero from './About';
import AppFooter from '../Footer/AppFooter';
import Search from './Search';
import HowItWorks from './HowItWorks';
import Subscribe from './Subscribe';
import Layout from '../AppBar/Layout';

function Index() {
    return (
        <div>
            <Layout>
                <div>
                    <Search />
                    {/*<ProductValues />*/}
                    <TagGrids />
                    <HowItWorks />
                    <Subscribe />
                    <AppFooter />
                </div>
            </Layout>
        </div>
    );
}

export default Index;
