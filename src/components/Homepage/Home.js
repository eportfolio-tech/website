// --- Post bootstrap -----
import React from 'react';
import ProductCategories from '../Homepage/ProductCategories';
import ProductSmokingHero from '../Homepage/ProductSmokingHero';
import AppFooter from '../Footer/AppFooter';
import ProductHero from '../Homepage/ProductHero.tsx';
import ProductValues from '../Homepage/ProductValues';
import ProductHowItWorks from '../Homepage/ProductHowItWorks';
import ProductCTA from '../Homepage/ProductCTA';
import Layout from '../AppBar/Layout';

function Index() {
    return (
        <div>
            <Layout>
                <ProductHero />
                {/*<ProductValues />*/}
                <ProductCategories />
                <ProductHowItWorks />
                <ProductCTA />
                <AppFooter />
            </Layout>
        </div>
    );
}

export default Index;
