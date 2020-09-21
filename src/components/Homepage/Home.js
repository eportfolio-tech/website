import withRoot from '../withRoot';
// --- Post bootstrap -----
import React from 'react';
import ProductCategories from '../Homepage/ProductCategories';
import ProductSmokingHero from '../Homepage/ProductSmokingHero';
import AppFooter from '../Footer/AppFooter';
import ProductHero from '../Homepage/ProductHero';
import ProductValues from '../Homepage/ProductValues';
import ProductHowItWorks from '../Homepage/ProductHowItWorks';
import ProductCTA from '../Homepage/ProductCTA';
import AppBar from '../AppBar/Layout';

function Index() {
  return (
    <React.Fragment>
      <AppBar />
      <ProductHero />
      {/*<ProductValues />*/}
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
